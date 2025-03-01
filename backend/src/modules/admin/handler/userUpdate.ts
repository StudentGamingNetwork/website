import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "@/modules/user/lib";
import UserModel, { ERoles } from "@/modules/user/model";

const SchemaRequest = Type.Object({
    _id: Type.String(),
    role: Type.Optional(Type.Object({
        name: Type.Enum(ERoles),
        modification: Type.Union([
            Type.Literal("add"),
            Type.Literal("remove")
        ])
    }))
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
        "/user/update",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member]);

            const targetUser = await UserModel.findById(request.body._id);

            if (!targetUser) {
                throw new httpErrors.NotFound("Aucune utilisateur trouvé.");
            }

            switch (request.body.role?.name) {
                case ERoles.Office:
                case ERoles.Admin:
                    UserLib.assertRoles(user, [ERoles.Admin]);
                    break;
                case ERoles.Council:
                case ERoles.Member:
                    UserLib.assertRoles(user, [ERoles.Office]);
                    break;
                case ERoles.Tournament:
                    UserLib.assertRoles(user, [ERoles.Council, ERoles.Tournament]);
                    break;
                case ERoles.Partnership:
                    UserLib.assertRoles(user, [ERoles.Council, ERoles.Partnership]);
                    break;
                case ERoles.Federation:
                    UserLib.assertRoles(user, [ERoles.Council, ERoles.Federation]);
                    break;
            }

            if (request.body.role?.modification === "add") {
                targetUser.roles.push(request.body.role.name);
            }

            if (request.body.role?.modification === "remove") {
                targetUser.roles = targetUser.roles.filter((role) => role !== request.body.role?.name);
            }

            await targetUser.save();

            reply.send({
                message: "Les rôles de cet utilisateur ont bien été mis à jour.",
                success: true
            });
        }
    );
}
