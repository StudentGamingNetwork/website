import * as path from "path";
import * as Fastify from "fastify";
import FastifyStatic from "@fastify/static";

export default async function (server: Fastify.FastifyInstance): Promise<void> {
    await server.register(FastifyStatic, {
        maxAge: 31536000000,
        root: path.join(__dirname, "../../frontend/dist")
    });
}
