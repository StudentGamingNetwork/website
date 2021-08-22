import { FastifyInstance } from "fastify";
import * as UserSearchHandler from "./userSearch";
import * as UserCertificateHandler from "./userCertificate";
import * as AssociationSearchHandler from "./associationSearch";
import * as AssociationUpdateHandler from "./associationUpdate";
import * as UserUpdateHandler from "./userUpdate";

export default async function (server: FastifyInstance): Promise<void> {
    await UserSearchHandler.register(server);
    await UserCertificateHandler.register(server);
    await AssociationSearchHandler.register(server);
    await AssociationUpdateHandler.register(server);
    await UserUpdateHandler.register(server);
}
