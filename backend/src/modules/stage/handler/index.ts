import { FastifyInstance } from "fastify";
import * as CreateHandler from "./create";
import * as GetHandler from "./get";
import * as DetailsHandler from "./details";


export default async function (server: FastifyInstance): Promise<void> {
    await CreateHandler.register(server);
    await GetHandler.register(server);
    await DetailsHandler.register(server);
}
