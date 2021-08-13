import Crypto from "crypto";
import httpErrors from "http-errors";
import { FastifyRequest } from "fastify";
import { ObjectId } from "mongodb";
import { pick } from "lodash";
import { LeanDocument } from "mongoose";
import * as UserLib from "@/modules/user/lib";
import AssociationModel, { IAssociationDocument } from "@/modules/association/model";
import { ERoles, IUserDocument } from "@/modules/user/model";

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

export async function getAssociationFromSlug(slug: string): Promise<IAssociationDocument> {
    let association;

    if (ObjectId.isValid(slug)) {
        association = await AssociationModel.findById(slug);
    }

    if (!association) {
        association = await AssociationModel.findOne({ "settings.slug": slug });
    }

    if (!association) {
        throw new httpErrors.NotFound("Aucune association trouvée.");
    }

    return association;
}

export function hasMember(user: IUserDocument, association: IAssociationDocument): boolean {
    return association.users.members.includes(user._id);
}

export function generateInvitationLink(): string {
    return Crypto.randomBytes(8).toString("hex");
}

export function sanitize(user: IUserDocument, association: IAssociationDocument): Partial<LeanDocument<IAssociationDocument>> {
    const allowedKeys = ["_id", "name", "federation", "logo", "network", "school", "settings.slug", "tag"];

    const isUserMember = (association.users.members.includes(user.id.toString()));
    const isSGNFederationMember = UserLib.hasRoles(user, [ERoles.Member, ERoles.Federation]);
    const isUserOwner = (association.users.owner.toString() === user.id.toString());

    if (isUserMember || isSGNFederationMember) {
        allowedKeys.push("users");
        allowedKeys.push("mail");
    }

    if (isUserOwner || isSGNFederationMember) {
        allowedKeys.push("settings.invitationLink");
    }

    return pick(association.toObject(), allowedKeys);
}
