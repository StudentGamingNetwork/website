import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../lib";

const UserLogin = Type.Object({
    mail: Type.String({ format: "email" }),
    password: Type.String()
});

type TUserLogin = Static<typeof UserLogin>;

const schema = {
    body: UserLogin,
    response: {
        200: UserLogin
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Body: TUserLogin; Response: TUserLogin }>(
        "/login",
        { schema },
        async (request) => {
            const { body: user } = request;
            await UserLib.login(user.mail, user.password);
        }
    );
}
