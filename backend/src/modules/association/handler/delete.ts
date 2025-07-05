import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as AssociationLib from "../lib.js";
import * as UserLib from "@/modules/user/lib";
import UserModel, { ERoles } from "@/modules/user/model";
import AssociationModel from "@/modules/association/model";

const SchemaRequest = Type.Object({
    id: Type.String({ minLength: 1 })
});

type TSchemaRequest = Static<typeof SchemaRequest>;

const SchemaResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    params: SchemaRequest,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.delete<{ Params: TSchemaRequest; Response: TSchemaResponse }>(
        "/delete/:id",
        { schema },
        async (request, reply) => {
            const associationId = request.params.id;
            const user = await UserLib.getUser(request);

            const isSGNFederationMember = UserLib.hasRoles(user, [ERoles.Member, ERoles.Federation]);

            if (isSGNFederationMember) {
                await AssociationModel.findByIdAndDelete(associationId);
            }
            else {
                const association = await AssociationLib.getOwningAssociation(request);

                if (associationId !== association.id.toString()) {
                    throw new httpErrors.Forbidden("Vous n'êtes pas propriétaire de cette association.");
                }

                if (association.users.members.length > 1) {
                    throw new httpErrors.Forbidden("Vous ne pouvez pas supprimer une association de plusieurs membres.");
                }

                await AssociationModel.findByIdAndDelete(associationId);
            }

            await UserModel.updateMany({ association: associationId }, { $unset: { association: 1 } });

            reply.send({
                message: "L'association a correctement été supprimée.",
                success: true
            });
        }
    );
}
