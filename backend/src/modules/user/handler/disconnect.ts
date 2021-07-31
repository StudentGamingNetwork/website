import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";

const UserLoginResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TUserLoginResponse = Static<typeof UserLoginResponse>;

const schema = {
    response: {
        200: UserLoginResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Body: null; Response: TUserLoginResponse }>(
        "/disconnect",
        { schema },
        async (_request, reply) => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            reply.headers({
                "Set-Cookie": [
                    `userId=deleted;path=/;expires=${ yesterday.toUTCString() }`,
                    `token=deleted;path=/;expires=${ yesterday.toUTCString() }`
                ]
            }).send({
                message: "Vous êtes maintenant déconnecté",
                success: true
            });
        }
    );
}
