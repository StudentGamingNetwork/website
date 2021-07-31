import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../lib";

const UserLogin = Type.Object({
    mail: Type.String({ format: "email" }),
    password: Type.String()
});

const UserLoginResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TUserLogin = Static<typeof UserLogin>;

const schema = {
    body: UserLogin,
    response: {
        200: UserLoginResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TUserLogin; Response: TUserLogin }>(
        "/login",
        { schema },
        async (request, reply) => {
            const { body: user } = request;
            const machine = {
                host: request.headers.host || "unknown",
                userAgent: request.headers["user-agent"] || "unknown"
            };

            const session = await UserLib.login(user.mail, user.password, machine);

            reply.headers({
                "Set-Cookie": [
                    `user=${ session.user };path=/;expires=${ new Date(session.dates.expiration).toUTCString() }`,
                    `token=${ session.token };path=/;expires=${ new Date(session.dates.expiration).toUTCString() }`
                ]
            }).send({
                message: "Vous êtes maintenant connecté",
                success: true
            });
        }
    );
}
