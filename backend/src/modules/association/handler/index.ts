import { FastifyInstance } from "fastify";
import * as CreateHandler from "./create";
import * as SearchHandler from "./search";
import * as UpdateHandler from "./update";
import * as GetHandler from "./get";
import * as DeleteHandler from "./delete";
import * as JoinHandler from "./join";
import * as LeaveHandler from "./leave";
import * as TransferOwnership from "./transfer-ownership";
import * as UploadLogoHandler from "@/modules/upload/handler/associationLogo";

export default async function (server: FastifyInstance): Promise<void> {
    await CreateHandler.register(server);
    await UploadLogoHandler.register(server);
    await SearchHandler.register(server);
    await GetHandler.register(server);
    await DeleteHandler.register(server);
    await UpdateHandler.register(server);
    await JoinHandler.register(server);
    await LeaveHandler.register(server);
    await TransferOwnership.register(server);
}
