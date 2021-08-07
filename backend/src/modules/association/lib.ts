import httpErrors from "http-errors";
import { FastifyRequest } from "fastify";
import * as UserLib from "@/modules/user/lib";
import AssociationModel, { IAssociationDocument } from "@/modules/association/model";

export async function getOwningAssociation(request: FastifyRequest): Promise<IAssociationDocument> {
    const user = await UserLib.getUser(request);

    if (!user.association) {
        throw new httpErrors.Forbidden("Vous n'êtes pas dans une association.");
    }

    const association = await AssociationModel.findOne({ _id: user.association });

    if (!association) {
        throw new httpErrors.NotFound("L'association est introuvable.");
    }

    if (association.users.owner.toString() !== user.id.toString()) {
        throw new httpErrors.Forbidden("Vous n'êtes pas propriétaire de cette association.");
    }

    return association;
}
