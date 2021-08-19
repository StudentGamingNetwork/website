import { FastifyInstance } from "fastify";
import * as CreateHandler from "./create";
import * as UpdateHandler from "./update";
import * as GetHandler from "./get";

export default async function (server: FastifyInstance): Promise<void> {
    await CreateHandler.register(server);
    await UpdateHandler.register(server);
    await GetHandler.register(server);
}
