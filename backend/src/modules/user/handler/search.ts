import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../lib";
import UserModel, { ERoles } from "@/modules/user/model";

const UserSearch = Type.Object({
    limit: Type.Number({ default: 20, maximum: 50, minimum: 1 }),
    search: Type.Optional(Type.String()),
    skip: Type.Number({ default: 0, minimum: 0 })
});

type TUserSearch = Static<typeof UserSearch>;

const UserSearchResponse = Type.Object({
    users: Type.Array(Type.Object({
        _id: Type.String(),
        name: Type.String(),
        avatar: Type.String(),
        mail: Type.String(),
        roles: Type.Array(Type.String()),
        username: Type.String()
    }))
});

type TUserSearchResponse = Static<typeof UserSearchResponse>;

const schema = {
    querystring: UserSearch,
    response: {
        200: UserSearchResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Querystring: TUserSearch; Response: TUserSearchResponse }>(
        "/search",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member]);

            const users = await search(request.query);

            reply.send({
                users
            });
        }
    );
}

async function search({ limit, search, skip }: { limit: number; search?: string; skip: number }) {
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

    return await UserModel.aggregate(aggregationStages).exec();
}
