import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../lib";

const UserSignup = Type.Object({
    mail: Type.String({ format: "email" }),
    password: Type.String()
});

type TUserSignup = Static<typeof UserSignup>;

const schema = {
    body: UserSignup,
    response: {
        200: UserSignup
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Body: TUserSignup; Response: TUserSignup }>(
        "/signup",
        { schema },
        async (request) => {
            const { body: user } = request;
            await UserLib.signup(user.mail, user.password);
        }
    );
}
