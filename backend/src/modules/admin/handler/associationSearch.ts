import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { escapeRegExp } from "lodash";
import AssociationModel, { IAssociationDocument } from "@/modules/association/model";
import { TypeBasicAdminAssociation } from "@/modules/association/type";
import { TypeAdminBasicUser } from "@/modules/user/type";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";

const SchemaRequest = Type.Object({
    limit: Type.Number({ default: 20, maximum: 100, minimum: 1 }),
    search: Type.Optional(Type.String()),
    skip: Type.Number({ default: 0, minimum: 0 })
});

type TSchemaRequest = Static<typeof SchemaRequest>;

const SchemaResponse = Type.Object({
    associations: Type.Array(
        Type.Object(
            {
                ...TypeBasicAdminAssociation.properties,
                users: Type.Object({
                    owner: TypeAdminBasicUser
                })
            }
        )
    )
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    querystring: SchemaRequest,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Querystring: TSchemaRequest; Response: TSchemaResponse }>(
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
        .populate("users.owner")
        .exec();
}
