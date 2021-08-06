import { FastifyInstance } from "fastify";
import UserHandler from "@/modules/user/handler";
import AssociationHandler from "@/modules/association/handler";

export default async function (server: FastifyInstance): Promise<void> {
    await server.register(UserHandler, { prefix: "/user" });
    await server.register(AssociationHandler, { prefix: "/association" });
}
