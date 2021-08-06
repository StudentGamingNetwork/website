import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../lib";

const UserPingResponse = Type.Object({
    _id: Type.String(),
    name: Type.String(),
    avatar: Type.String(),
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
            reply.send(user);
        }
    );
}
