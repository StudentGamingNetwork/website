import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "../lib";
import { Cookie } from "@/utils";

const UserPingResponse = Type.Object({
    id: Type.String(),
    mail: Type.String(),
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
            if (!request.headers.cookie) {
                throw new httpErrors.NotFound("Aucun cookie détecté");
            }

            const cookies = Cookie.decode(request.headers.cookie);

            const user = await UserLib.ping(cookies as {token: string; userId: string});

            reply.send({
                id: user._id,
                mail: user.mail,
                username: user.username
            });
        }
    );
}
