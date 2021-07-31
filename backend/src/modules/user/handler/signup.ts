import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../lib";

const UserSignup = Type.Object({
    mail: Type.String({ format: "email" }),
    password: Type.String()
});

const UserSignupResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TUserSignup = Static<typeof UserSignup>;

const schema = {
    body: UserSignup,
    response: {
        200: UserSignupResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TUserSignup; Response: TUserSignup }>(
        "/signup",
        { schema },
        async (request) => {
            const { body: user } = request;
            await UserLib.signup(user.mail, user.password);
            return { message: "Votre inscription a bien été prise en compte", success: true };
        }
    );
}
