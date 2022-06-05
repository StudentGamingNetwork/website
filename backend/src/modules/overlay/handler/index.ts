import { FastifyInstance } from "fastify";
import * as ListHandler from "./list";
export default async function (server: FastifyInstance): Promise<void> {
    await ListHandler.register(server);
}
