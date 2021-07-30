import { FastifyInstance } from "fastify";
import UserHandler from "@/modules/user/handler";

export default async function (server: FastifyInstance): Promise<void> {
    await server.register(UserHandler, { prefix: "/user" });
}
