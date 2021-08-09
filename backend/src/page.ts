import * as path from "path";
import * as fs from "fs";
import * as Fastify from "fastify";

const pageTemplate = fs.readFileSync(path.join(__dirname, "../../frontend/dist/index.html")).toString();

export default async function (server: Fastify.FastifyInstance): Promise<void> {
    server.get("*", async (_request, reply) => {
        reply.type("text/html").send(pageTemplate);

    });
}
