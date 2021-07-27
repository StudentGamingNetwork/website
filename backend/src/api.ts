import * as Fastify from "fastify";
import UserHandler from "@/modules/user/handler";

export default async function (server: Fastify.FastifyInstance): Promise<void> {
    await server.register(UserHandler, { prefix: "/user" });
}
