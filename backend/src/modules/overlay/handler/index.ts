import { FastifyInstance } from "fastify";
import * as ListHandler from "./list";
import * as HookHandler from "./hook";

export default async function (server: FastifyInstance): Promise<void> {
    await ListHandler.register(server);
    await HookHandler.register(server);
}
