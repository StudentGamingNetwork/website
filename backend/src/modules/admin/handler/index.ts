import { FastifyInstance } from "fastify";
import * as UserSearchHandler from "./userSearch";
import * as AssociationSearchHandler from "./associationSearch";

export default async function (server: FastifyInstance): Promise<void> {
    await UserSearchHandler.register(server);
    await AssociationSearchHandler.register(server);
}
