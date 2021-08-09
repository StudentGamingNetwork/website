import "module-alias/register";
import * as Fastify from "fastify";
import cors from "cors";
import Middie from "middie";
import FastifyMultipart from "fastify-multipart";
import { connectDatabase } from "@/database";
import APIHandler from "@/api";
import StaticHandler from "@/static";
import UploadHandler from "@/upload";

async function init() {
    const isDevelopment = (process.env.NODE_ENV === "development");
    await connectDatabase();

    const server: Fastify.FastifyInstance = Fastify.fastify({ logger: isDevelopment });

    await server.register(Middie);
    await server.register(FastifyMultipart);

    server.use(cors({
        credentials: true,
        origin: process.env.CORS_ORIGIN
    }));

    await server.register(APIHandler, { prefix: "/api" });
    await server.register(StaticHandler, { prefix: "/static" });
    await server.register(UploadHandler, { prefix: "/upload" });

    return server;
}

init().then((server) => {
    server.listen(Number(process.env.BACKEND_PORT), (error: Error) => {
        server.ready(() => {
            console.log(server.printRoutes());
        });

        if (error) {
            server.log.error({ error });
            process.exit(1);
        }
    });
});
