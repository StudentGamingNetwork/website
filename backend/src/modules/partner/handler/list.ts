import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import PartnerModel from "../model";
import { TypePartner } from "@/modules/partner/type";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";

const SchemaResponse = Type.Array(Type.Partial(TypePartner));

type TSchemaResponse = Static<typeof SchemaResponse>;


const schema = {
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Params: null; Response: TSchemaResponse }>(
        "/list",
        { schema },
        async (request, reply) => {
            const findParameters = {} as Record<string, any>;
            let hasPartnershipRights = false;

            let user;

            try {
                user = await UserLib.getUser(request);
            }
            catch (e) {
                user = undefined;
            }

            if (user) {
                hasPartnershipRights = UserLib.hasRoles(user, [ERoles.Member, ERoles.Partnership]);
            }

            if (!hasPartnershipRights) {
                findParameters.public = true;
            }

            const partners = await PartnerModel.find(findParameters).sort({ _id: -1 });

            reply.send(partners);
        }
    );
}
