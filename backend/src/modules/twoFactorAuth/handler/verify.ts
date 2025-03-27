import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as TokenLib from "../lib";
import * as SessionLib from "@/modules/session/lib";
import UserModel from "@/modules/user/model";


const TokenVerifyBody = Type.Object({
    token: Type.String()
});

type TTokenVerifyBody = typeof TokenVerifyBody;

const SchemaResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    body: TokenVerifyBody,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TTokenVerifyBody; Response: TSchemaResponse }>(
        "/verify",
        { schema },
        async (request, reply) => {
            const token = request.headers.cookie?.split(";").map((cookie) => cookie.trim().split("=")[0] === "token" ? cookie.trim().split("=")[1] : null)[0];
            const session = await SessionLib.getSessionByTempToken(token as string);

            if (!session) {
                throw new httpErrors.Unauthorized("Votre session n'est plus valide.");
            }

            const validatedSession = await SessionLib.validate(session);

            const user = await UserModel.findById(validatedSession.userId);

            if (!user?.twoFactorAuth?.enabled) {
                throw new httpErrors.Forbidden("L'authentification à deux facteurs n'est pas activée.");
            }

            const isTokenValid = TokenLib.verifyToken(request.body.token, user.twoFactorAuth.secret);

            if (!isTokenValid) {
                throw new httpErrors.Forbidden("Le token est invalide.");
            }
           
            await validatedSession.save();

            reply.headers({
                "Set-Cookie": [
                    `userId=${ validatedSession.userId };path=/;expires=${ new Date(validatedSession.dates.expiration).toUTCString() };SameSite=None;Secure`,
                    `token=${ validatedSession.token };path=/;expires=${ new Date(validatedSession.dates.expiration).toUTCString() };SameSite=None;Secure`
                ]
            }).send({
                message: "Vous êtes maintenant connecté",
                success: true
            });
        }
    );
}
