import { FastifyInstance } from "fastify";
import * as LoginHandler from "./login";
import * as SignupHandler from "./signup";

export default async function (server: FastifyInstance): Promise<void> {
    await LoginHandler.register(server);
    await SignupHandler.register(server);
}
