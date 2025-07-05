import * as path from "path";
import { fileURLToPath } from "url";
import * as Fastify from "fastify";
import FastifyStatic from "@fastify/static";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function (server: Fastify.FastifyInstance): Promise<void> {
    await server.register(FastifyStatic, {
        root: path.join(__dirname, "../upload")
    });
}
