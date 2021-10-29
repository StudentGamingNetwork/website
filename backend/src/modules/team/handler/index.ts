import { FastifyInstance } from "fastify";
import * as CreateHandler from "./create";
import * as UpdateHandler from "./update";
import * as GetHandler from "./get";
import * as JoinHandler from "./join";
import * as DeleteHandler from "./delete";
import * as ListHandler from "./list";
import * as ManageHandler from "./manage";
import * as SchoolsHandler from "./schools";
import * as ExportHAndler from "./export";

export default async function (server: FastifyInstance): Promise<void> {
    await CreateHandler.register(server);
    await UpdateHandler.register(server);
    await GetHandler.register(server);
    await JoinHandler.register(server);
    await DeleteHandler.register(server);
    await ListHandler.register(server);
    await ManageHandler.register(server);
    await SchoolsHandler.register(server);
    await ExportHAndler.register(server);
}
