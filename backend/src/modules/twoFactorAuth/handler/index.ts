import { FastifyInstance } from "fastify";
import * as CreateHandler from "./create";
import * as RemoveHandler from "./remove";
import * as VerifyHandler from "./verify";
import * as ValidateHandler from "./validate";


export default async function (server: FastifyInstance): Promise<void> {
    await CreateHandler.register(server);
    await RemoveHandler.register(server);
    await VerifyHandler.register(server);
    await ValidateHandler.register(server);
}
