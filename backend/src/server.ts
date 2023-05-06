import "module-alias/register";
import * as Fastify from "fastify";
import cors from "cors";
import fastifyMiddie from "@fastify/middie";
import fastifyMultipart from "@fastify/multipart";
import { closeDatabase, connectDatabase } from "@/database";
import APIHandler from "@/api";
import StaticHandler from "@/static";
import UploadHandler from "@/upload";
import PageHandler from "@/page";
//import NotFoundHandler from "@/notFound";

async function init() {
    const isDevelopment = (process.env.NODE_ENV === "development");
    await connectDatabase();

    const server: Fastify.FastifyInstance = Fastify.fastify({ logger: isDevelopment });

    await server.register(fastifyMiddie);
    await server.register(fastifyMultipart);

    server.use(cors({
        credentials: true,
        origin: process.env.CORS_ORIGIN
    }));

    await server.register(APIHandler, { prefix: "/api" });
    await server.register(StaticHandler, { prefix: "/static" });
    await server.register(UploadHandler, { prefix: "/upload" });
    await server.register(PageHandler);
    //await server.register(NotFoundHandler);

    return server;
}

init().then((server) => {
    server.listen({ port: Number(process.env.BACKEND_PORT) }, (error: Error | null) => {
        server.ready(() => {
            console.log(server.printRoutes());
        });

        if (error) {
            server.log.error({ error });
            process.exit(1);
        }
    });
});

process.on("SIGINT", async function() {
    await closeDatabase();
    process.exit(1);
});
