import { FastifyInstance } from "fastify";
import * as CreateHandler from "./create";
import * as UploadLogo from "@/modules/upload/handler/associationLogo";

export default async function (server: FastifyInstance): Promise<void> {
    await CreateHandler.register(server);
    await UploadLogo.register(server);
}
