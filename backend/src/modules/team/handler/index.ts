import { FastifyInstance } from "fastify";
import * as CreateHandler from "./create";
import * as UpdateHandler from "./update";
import * as GetHandler from "./get";
import * as JoinHandler from "./join";
import * as DeleteHandler from "./delete";
import * as ListHandler from "./list";
import * as ManageHandler from "./manage";
import * as SchoolsHander from "./schools";

export default async function (server: FastifyInstance): Promise<void> {
    await CreateHandler.register(server);
    await UpdateHandler.register(server);
    await GetHandler.register(server);
    await JoinHandler.register(server);
    await DeleteHandler.register(server);
    await ListHandler.register(server);
    await ManageHandler.register(server);
    await SchoolsHander.register(server);
}
