import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as TokenLib from "../lib";
import * as UserLib from "@/modules/user/lib";

const SchemaResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean(),
    tokenLink: Type.String()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Body: null; Response: TSchemaResponse }>(
        "/create",
        { schema },
        async (request, reply) => {

            const user = await UserLib.getUser(request);

            if (user.twoFactorAuth?.enabled) {
                throw new httpErrors.Forbidden("L'authentification à deux facteurs est déjà activée.");
            }

            const [tokenLink,secret] = TokenLib.generateSecret(user.mail);

            user.twoFactorAuth = {
                enabled: true,
                secret
            };

            await user.save();

            reply.send({
                message: "Le token a été généré avec succès",
                success: true,
                tokenLink
            });
        }
    );
}
