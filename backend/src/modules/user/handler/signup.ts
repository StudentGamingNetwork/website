import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../lib";

const UserSignup = Type.Object({
    mail: Type.String({ format: "email" }),
    password: Type.String()
});

type TUserSignup = Static<typeof UserSignup>;

const UserSignupResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TUserSignupResponse = Static<typeof UserSignupResponse>;

const schema = {
    body: UserSignup,
    response: {
        200: UserSignupResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TUserSignup; Response: TUserSignupResponse }>(
        "/signup",
        { schema },
        async (request, reply) => {
            const { body: user } = request;
            const machine = {
                host: request.headers.host || "unknown",
                userAgent: request.headers["user-agent"] || "unknown"
            };

            const session = await UserLib.signup(user.mail, user.password, machine);

            reply.headers({
                "Set-Cookie": [
                    `userId=${ session.userId };path=/;expires=${ new Date(session.dates.expiration).toUTCString() }`,
                    `token=${ session.token };path=/;expires=${ new Date(session.dates.expiration).toUTCString() }`
                ]
            }).send({
                message: "Votre inscription a bien été prise en compte",
                success: true
            });
        }
    );
}
