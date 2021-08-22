import { FastifyInstance } from "fastify";
import * as CreateHandler from "./create";
import * as UpdateHandler from "./update";
import * as DeleteHandler from "./delete";
import * as ListHandler from "./list";
import * as UploadLogoHandler from "@/modules/upload/handler/partnerLogo";

export default async function (server: FastifyInstance): Promise<void> {
    await CreateHandler.register(server);
    await UploadLogoHandler.register(server);
    await DeleteHandler.register(server);
    await ListHandler.register(server);
    await UpdateHandler.register(server);
}
