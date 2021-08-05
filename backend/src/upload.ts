import * as path from "path";
import * as Fastify from "fastify";
import FastifyStatic from "fastify-static";

export default async function (server: Fastify.FastifyInstance): Promise<void> {
    await server.register(FastifyStatic, {
        root: path.join(__dirname, "../upload")
    });
}
