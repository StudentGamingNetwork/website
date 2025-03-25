import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../lib";

const UserLogin = Type.Object({
    mail: Type.String({ format: "email" }),
    password: Type.String()
});

type TUserLogin = Static<typeof UserLogin>;

const UserLoginResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean(),
    twoFactorAuth: Type.Boolean()
});

type TUserLoginResponse = Static<typeof UserLoginResponse>;

const schema = {
    body: UserLogin,
    response: {
        200: UserLoginResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TUserLogin; Response: TUserLoginResponse }>(
        "/login",
        { schema },
        async (request, reply) => {
            const { body: user } = request;
            const machine = {
                host: request.headers.host || "unknown",
                userAgent: request.headers["user-agent"] || "unknown"
            };

            const session = await UserLib.login(user.mail, user.password, machine);

            if (session.twoFactorAuth) {
                reply.headers({
                    "Set-Cookie": [
                        `token=${ session.tempToken };path=/;expires=${ new Date(session.dates.expiration).toUTCString() };SameSite=None;Secure`
                    ]
                }).send({
                    message: "Entrez le token généré dans votre application.",
                    success: true,
                    twoFactorAuth: session.twoFactorAuth
                });

                return;
            }

            reply.headers({
                "Set-Cookie": [
                    `token=${ session.token };path=/;expires=${ new Date(session.dates.expiration).toUTCString() };SameSite=None;Secure`,
                    `userId=${ session.userId };path=/;expires=${ new Date(session.dates.expiration).toUTCString() };SameSite=None;Secure`
                ]
            }).send({
                message: "Vous êtes maintenant connecté.",
                success: true,
                twoFactorAuth: session.twoFactorAuth
            });
        }
    );
}
