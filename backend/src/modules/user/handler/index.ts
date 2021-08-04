import { FastifyInstance } from "fastify";
import * as LoginHandler from "./login";
import * as SignupHandler from "./signup";
import * as PingHandler from "./ping";
import * as DisconnectHandler from "./disconnect";
import * as UpdateHandler from "./update";

export default async function (server: FastifyInstance): Promise<void> {
    await LoginHandler.register(server);
    await SignupHandler.register(server);
    await PingHandler.register(server);
    await DisconnectHandler.register(server);
    await UpdateHandler.register(server);
}
