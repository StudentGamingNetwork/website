import * as Fastify from "fastify";

export default async function (server: Fastify.FastifyInstance): Promise<void> {
    console.log(server); // To replace
}
