import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as TokenLib from "../lib";
import * as SessionLib from "@/modules/session/lib";
import * as UserLib from "@/modules/user/lib";
import SessionModel from "@/modules/session/model";


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

            const user = await UserLib.getUser(request);

            if (!user) {
                throw new httpErrors.Unauthorized("Votre session n'est plus valide.");
            }

            const session = await SessionModel.findOne({
                $and: [{ userId: user.id }, { "dates.expiration": { $gt: new Date() } }]
            }).exec();

            if (!session) {
                throw new httpErrors.Unauthorized("Votre session n'est plus valide.");
            }

            await SessionLib.validate(session);

            
            if (!user.twoFactorAuth?.enabled) {
                throw new httpErrors.Forbidden("L'authentification à deux facteurs n'est pas activée.");
            }

            const isTokenValid = TokenLib.verifyToken(request.body.token, user.twoFactorAuth.secret);

            if (!isTokenValid) {
                throw new httpErrors.Forbidden("Le token est invalide.");
            }
           
            await session.save();

            reply.headers({
                "Set-Cookie": [
                    `userId=${ session.userId };path=/;expires=${ new Date(session.dates.expiration).toUTCString() };SameSite=None;Secure`,
                    `token=${ session.token };path=/;expires=${ new Date(session.dates.expiration).toUTCString() };SameSite=None;Secure`
                ]
            }).send({
                message: "Vous êtes maintenant connecté",
                success: true
            });
        }
    );
}
