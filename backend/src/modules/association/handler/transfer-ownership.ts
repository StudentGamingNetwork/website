import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "@/modules/user/lib";
import * as AssociationLib from "@/modules/association/lib";
import UserModel from "@/modules/user/model";


const SchemaRequest = Type.Object({
    newOwnerEmail: Type.String({ format: "email" })
});

type TSchemaRequest = Static<typeof SchemaRequest>;

const SchemaResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    body: SchemaRequest,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TSchemaRequest; Response: TSchemaResponse }>(
        "/transfer-ownership",
        { schema },
        async (request, reply) => {
            const association = await AssociationLib.getOwningAssociation(request);
            const newOwner = await UserModel.findOne({ mail: request.body.newOwnerEmail }).exec();

            if (!newOwner || !association.users.members.includes(newOwner.id)) {
                throw new httpErrors.Forbidden("L'utilisateur ne fait pas parti de l'association.");
            }

            association.users.owner = newOwner.id;

            await association.save();

            reply.send({
                message: "Vous avez cédé les droits de cette association.",
                success: true
            });
        }
    );
}
