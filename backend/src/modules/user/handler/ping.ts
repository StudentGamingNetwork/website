import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../lib";

const UserPingResponse = Type.Object({
    id: Type.String(),
    mail: Type.String(),
    roles: Type.Array(Type.String()),
    username: Type.String()
});

type TUserPingResponse = Static<typeof UserPingResponse>;

const schema = {
    response: {
        200: UserPingResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Body: null; Response: TUserPingResponse }>(
        "/ping",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);

            reply.send({
                id: user._id,
                mail: user.mail,
                roles: user.roles,
                username: user.username
            });
        }
    );
}
