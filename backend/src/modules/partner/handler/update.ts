import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import PartnerModel from "../model";
import { TypePartner } from "@/modules/partner/type";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";

const SchemaRequest = TypePartner;

type TSchemaRequest = Static<typeof SchemaRequest>;

const SchemaResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    body: SchemaRequest,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TSchemaRequest; Response: TSchemaResponse }>(
        "/update",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member, ERoles.Partnership]);

            const partner = await PartnerModel.findById(request.body._id);

            if (!partner) {
                throw new httpErrors.NotFound("Aucun partenaire trouvé.");
            }

            partner.name = request.body.name;
            partner.description = request.body.description;
            partner.networks.facebook = request.body.networks?.facebook || "";
            partner.networks.twitter = request.body.networks?.twitter || "";
            partner.networks.website = request.body.networks?.website || "";
            partner.public = request.body.public;

            await partner.save();

            reply.send({
                message: "Le partenaire a correctement été mis à jour.",
                success: true
            });
        }
    );
}
