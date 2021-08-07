import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { escapeRegExp } from "lodash";
import AssociationModel, { IAssociationDocument } from "@/modules/association/model";
import { TypeBasicAssociation } from "@/modules/association/type";

const AssociationSearch = Type.Object({
    limit: Type.Number({ default: 20, maximum: 50, minimum: 1 }),
    search: Type.Optional(Type.String()),
    skip: Type.Number({ default: 0, minimum: 0 })
});

type TAssociationSearch = Static<typeof AssociationSearch>;

const AssociationSearchResponse = Type.Object({
    associations: Type.Array(
        TypeBasicAssociation
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
        "/search",
        { schema },
        async (request, reply) => {
            const associations = await associationSearch(request.query);

            reply.send({
                associations
            });
        }
    );
}

async function associationSearch({ limit, search, skip }: { limit: number; search?: string; skip: number }): Promise<Array<IAssociationDocument>> {

    const findParameters = {} as Record<string, any>;

    if (search) {
        const searchRegex = new RegExp(escapeRegExp(search), "gi");

        findParameters.$or = [
            { "name": searchRegex },
            { "school.name": searchRegex }
        ];
    }

    return AssociationModel.find(findParameters)
        .sort({ "name": 1 })
        .skip(skip)
        .limit(limit)
        .exec();
}
