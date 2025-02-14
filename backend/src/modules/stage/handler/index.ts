import { FastifyInstance } from "fastify";
import * as CreateHandler from "./create";
import * as GetHandler from "./get";
import * as DetailsHandler from "./details";
import * as ListHandler from "./list";
import * as UpdateHandler from "./update";
import * as DeleteHandler from "./delete";


export default async function (server: FastifyInstance): Promise<void> {
    await CreateHandler.register(server);
    await GetHandler.register(server);
    await DetailsHandler.register(server);
    await ListHandler.register(server);
    await UpdateHandler.register(server);
    await DeleteHandler.register(server);
}
