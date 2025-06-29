import { FastifyInstance } from "fastify";
import * as LoginHandler from "./login";
import * as SignupHandler from "./signup";
import * as PingHandler from "./ping";
import * as DisconnectHandler from "./disconnect";
import * as UpdateHandler from "./update";
import * as UpdatePlatformsHandler from "./updatePlatforms";
import * as PassswordToken from "./resetPassword";
import * as PasswordChange from "./change-password";
import * as BindHandler from "./bind";
import * as UploadAvatar from "@/modules/upload/handler/avatar";
import * as UploadCertificate from "@/modules/upload/handler/certificate";

export default async function (server: FastifyInstance): Promise<void> {
    await LoginHandler.register(server);
    await SignupHandler.register(server);
    await PingHandler.register(server);
    await DisconnectHandler.register(server);
    await UpdateHandler.register(server);
    await UpdatePlatformsHandler.register(server);
    await UploadAvatar.register(server);
    await UploadCertificate.register(server);
    await PassswordToken.register(server);
    await PasswordChange.register(server);
    await BindHandler.register(server);
}
