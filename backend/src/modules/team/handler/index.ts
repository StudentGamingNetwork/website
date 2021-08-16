import { FastifyInstance } from "fastify";
import * as CreateHandler from "./create";
import * as UpdateHandler from "./update";

export default async function (server: FastifyInstance): Promise<void> {
    await CreateHandler.register(server);
    await UpdateHandler.register(server);
}
