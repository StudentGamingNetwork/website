import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { pick } from "lodash";
import * as AssociationLib from "../lib";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";
import { TypeFullMemberAssociation } from "@/modules/association/type";

const SchemaParams = Type.Object({
    slug: Type.String({ minLength: 1 })
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaResponse = Type.Partial(TypeFullMemberAssociation);

type TSchemaResponse = Static<typeof SchemaResponse>;


const schema = {
    params: SchemaParams,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Params: TSchemaParams; Response: TSchemaResponse }>(
        "/get/:slug",
        { schema },
        async (request, reply) => {
            const slug = request.params.slug;
            const association = await AssociationLib.getAssociationFromSlug(slug);

            let user;

            try {
                user = await UserLib.getUser(request);
            }
            catch (e) {
                user = undefined;
            }

            if (user) {
                const isAssociationMember = AssociationLib.hasMember(user, association);
                const isSGNMember = UserLib.hasRoles(user, [ERoles.Member]);

                if (isAssociationMember || isSGNMember) {
                    await association
                        .populate("users.members")
                        .populate("users.moderators")
                        .populate("users.owner")
                        .execPopulate();
                    reply.send(association);
                    return;
                }
            }

            reply.send(
                pick(association, [
                    "_id",
                    "name",
                    "federation",
                    "logo",
                    "networks",
                    "school",
                    "tag"
                ])
            );
        }
    );
}
