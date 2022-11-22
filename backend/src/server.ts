import "module-alias/register";
import * as Fastify from "fastify";
import cors from "cors";
import Middie from "middie";
import FastifyMultipart from "@fastify/multipart";
import { closeDatabase, connectDatabase } from "@/database";
import APIHandler from "@/api";
import StaticHandler from "@/static";
import UploadHandler from "@/upload";
import PageHandler from "@/page";
// import NotFoundHandler from "@/notFound";
import * as Fake from "@/database/test/fake";
import UserModel from "@/modules/user/model";

async function init() {
    const isDevelopment = (process.env.NODE_ENV === "development");
    await connectDatabase();

    const server: Fastify.FastifyInstance = Fastify.fastify({ logger: isDevelopment });

    for (let i = 0; i <= 10; i++) {
        Fake.generate(UserModel, { subscriptionDate: new Date() });
    }

    await server.register(Middie);
    await server.register(FastifyMultipart);

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
    server.listen(Number(process.env.BACKEND_PORT), "127.0.0.1", (error: Error | null) => {
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
