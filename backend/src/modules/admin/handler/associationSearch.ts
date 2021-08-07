import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../../user/lib";
import { ERoles } from "@/modules/user/model";
import AssociationModel from "@/modules/association/model";
import { TypeMemberAssociation } from "@/modules/association/type";

const AssociationSearch = Type.Object({
    limit: Type.Number({ default: 20, maximum: 50, minimum: 1 }),
    search: Type.Optional(Type.String()),
    skip: Type.Number({ default: 0, minimum: 0 })
});

type TAssociationSearch = Static<typeof AssociationSearch>;

const AssociationSearchResponse = Type.Object({
    associations: Type.Array(
        TypeMemberAssociation
    )
});

type TAssociationSearchResponse = Static<typeof AssociationSearchResponse>;

const schema = {
    querystring: AssociationSearch,
    response: {
        200: AssociationSearchResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Querystring: TAssociationSearch; Response: TAssociationSearchResponse }>(
        "/association/search",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member]);

            const associations = await associationSearch(request.query);

            reply.send({
                associations
            });
        }
    );
}

async function associationSearch({ limit, search, skip }: { limit: number; search?: string; skip: number }) {
    const aggregationStages = [];

    if (search) {
        aggregationStages.push({
            $match: { $text: { $search: search } }
        });
    }


    if (search) {
        aggregationStages.push({
            $sort: { score: { $meta: "textScore" } }
        });
    }
    else {
        aggregationStages.push({
            $sort: { "_id": -1 }
        });
    }


    aggregationStages.push({
        $skip: skip
    });

    aggregationStages.push({
        $limit: limit
    });

    return await AssociationModel.aggregate(aggregationStages).exec();
}
