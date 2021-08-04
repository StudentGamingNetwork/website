import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../lib";

const UserDeleteResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TUserDeleteResponse = Static<typeof UserDeleteResponse>;

const schema = {
    response: {
        200: UserDeleteResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.delete<{ Body: null; Response: TUserDeleteResponse }>(
        "/",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            await user.delete();

            reply.send({
                message: "Votre compte a bien été supprimé.",
                success: true
            });
        }
    );
}
