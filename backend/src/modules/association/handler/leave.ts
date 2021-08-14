import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "@/modules/user/lib";
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
    body: SchemaRequest,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TSchemaRequest; Response: TSchemaResponse }>(
        "/leave",
        { schema },
        async (request, reply) => {
            const associationId = request.body.id;
            const user = await UserLib.getUser(request);

            if (!user.association) {
                throw new httpErrors.Forbidden("Vous n'êtes pas dans une association.");
            }

            if (user.association.toString() !== associationId) {
                throw new httpErrors.Forbidden("Vous n'êtes pas dans cette association.");
            }

            const association = await AssociationModel.findById(user.association);

            if (!association) {
                throw new httpErrors.NotFound("Aucune association trouvée.");
            }

            if (association.users.owner.toString() === user._id.toString()) {
                throw new httpErrors.Forbidden("Vous ne pouvez pas quitter une association dont vous êtes propriétaire.");
            }

            user.association = undefined;
            association.users.members = association.users.members.filter((id) => id.toString() !== user._id.toString());

            await user.save();
            await association.save();

            reply.send({
                message: "Vous avez bien quitté cette association.",
                success: true
            });
        }
    );
}
