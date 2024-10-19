import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "@/modules/user/lib";

const SchemaResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.delete<{ Body: null; Response: TSchemaResponse }>(
        "/remove",
        { schema },
        async (request, reply) => {

            const user = await UserLib.getUser(request);

            if (!user) {
                throw new httpErrors.Unauthorized("Vous devez être connecté pour accéder à cette ressource.");
            }

            if (!user.twoFactorAuth?.enabled) {
                throw new httpErrors.Unauthorized("L'authentification à deux facteurs n'est pas activée.");
            }

            user.twoFactorAuth.secret = "";
            user.twoFactorAuth.enabled = false;

            await user.save();

            reply.send({
                message: "L'authentification à deux facteurs a été désactivtée avec succès",
                success: true
            });
        }
    );
}
