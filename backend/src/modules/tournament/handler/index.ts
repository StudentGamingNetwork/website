import { FastifyInstance } from "fastify";
import * as CreateHandler from "./create";

export default async function (server: FastifyInstance): Promise<void> {
    await CreateHandler.register(server);
}
