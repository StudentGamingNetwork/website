import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { TypeBasicUpdateAssociation } from "@/modules/association/type";
import * as AssociationLib from "@/modules/association/lib";

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

            association.name = request.body.name;
            association.networks.facebook = request.body.networks?.facebook || "";
            association.networks.twitch = request.body.networks?.twitch || "";
            association.networks.twitter = request.body.networks?.twitter || "";
            association.networks.instagram = request.body.networks?.instagram || "";
            association.tag = request.body.tag || "";
            association.school.name = request.body.school.name;
            association.school.studentsNumber = request.body.school.studentsNumber;
            association.mail = request.body.mail;

            await association.save();

            reply.send({
                message: "L'association a correctement été mise à jour.",
                success: true
            });
        }
    );
}
