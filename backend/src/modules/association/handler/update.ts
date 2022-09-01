import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import { TypeBasicUpdateAssociation } from "@/modules/association/type";
import * as AssociationLib from "@/modules/association/lib";
import AssociationModel from "@/modules/association/model";

const AssociationUpdate = TypeBasicUpdateAssociation;

type TAssociationUpdate = Static<typeof AssociationUpdate>;

const AssociationUpdateResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TAssociationUpdateResponse = Static<typeof AssociationUpdateResponse>;

const schema = {
    body: AssociationUpdate,
    response: {
        200: AssociationUpdateResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TAssociationUpdate; Response: TAssociationUpdateResponse }>(
        "/update",
        { schema },
        async (request, reply) => {
            const association = await AssociationLib.getOwningAssociation(request);

            if (request.body.settings?.slug) {
                const slugRegex = /^[A-Za-z0-9-_]+$/;
                if (!slugRegex.test(request.body.settings.slug)) {
                    throw new httpErrors.BadRequest("Le slug n'est pas au bon format.");
                }

                if (await AssociationModel.findOne({ _id: { $ne: association._id }, "settings.slug": request.body.settings.slug })) {
                    throw new httpErrors.Forbidden("Une autre association utilise déjà ce slug.");
                }
            }

            if (request.body.tag) {
                const tagRegex = /^[A-Za-z0-9]{2,4}$/;
                if (!tagRegex.test(request.body.tag)) {
                    throw new httpErrors.BadRequest("Le tag n'est pas au bon format.");
                }
            }

            association.name = request.body.name;
            association.networks.facebook = request.body.networks?.facebook || "";
            association.networks.twitch = request.body.networks?.twitch || "";
            association.networks.twitter = request.body.networks?.twitter || "";
            association.networks.instagram = request.body.networks?.instagram || "";
            association.networks.website = request.body.networks?.website || "";
            association.tag = request.body.tag || "";
            association.school.name = request.body.school.name;
            association.school.studentsNumber = request.body.school.studentsNumber || 0;
            association.school.address = request.body.school.address;
            association.settings.slug = request.body.settings?.slug?.toLocaleLowerCase() || "";
            association.mail = request.body.mail;
            await association.save();

            reply.send({
                message: "L'association a correctement été mise à jour.",
                success: true
            });
        }
    );
}
