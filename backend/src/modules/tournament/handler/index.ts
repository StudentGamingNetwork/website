import { FastifyInstance } from "fastify";
import * as CreateHandler from "./create";
import * as UpdateHandler from "./update";
import * as ListHandler from "./list";
import * as GetHandler from "./get";
import * as DeleteHandler from "./delete";
import * as UploadLogoHandler from "@/modules/upload/handler/tournamentLogo";

export default async function (server: FastifyInstance): Promise<void> {
    await CreateHandler.register(server);
    await UpdateHandler.register(server);
    await GetHandler.register(server);
    await ListHandler.register(server);
    await DeleteHandler.register(server);
    await UploadLogoHandler.register(server);
}
