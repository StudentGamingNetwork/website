import { FastifyInstance } from "fastify";
import * as UserSearchHandler from "./userSearch";
import * as AssociationSearchHandler from "./associationSearch";
import * as AssociationUpdateHandler from "./associationUpdate";

export default async function (server: FastifyInstance): Promise<void> {
    await UserSearchHandler.register(server);
    await AssociationSearchHandler.register(server);
    await AssociationUpdateHandler.register(server);
}
