import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { escapeRegExp } from "lodash";
import * as UserLib from "../../user/lib";
import UserModel, { ERoles, IUserDocument } from "@/modules/user/model";
import { TypeAdminUser } from "@/modules/user/type";

const SchemaRequest = Type.Object({
    limit: Type.Number({ default: 20, maximum: 100, minimum: 1 }),
    search: Type.Optional(Type.String()),
    skip: Type.Number({ default: 0, minimum: 0 })
});

type TSchemaRequest = Static<typeof SchemaRequest>;

const UserSearchResponse = Type.Object({
    users: Type.Array(TypeAdminUser)
});

type TUserSearchResponse = Static<typeof UserSearchResponse>;

const schema = {
    querystring: SchemaRequest,
    response: {
        200: UserSearchResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Querystring: TSchemaRequest; Response: TUserSearchResponse }>(
        "/user/search",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member]);

            const users = await userSearch(request.query);

            reply.send({
                users
            });
        }
    );
}

async function userSearch({ limit, search, skip }: { limit: number; search?: string; skip: number }): Promise<Array<IUserDocument>> {

    const findParameters = {} as Record<string, any>;

    if (search) {
        const searchRegex = new RegExp(escapeRegExp(search), "gi");

        findParameters.$or = [
            { "name": searchRegex },
            { "username": searchRegex },
            { "mail": searchRegex },
            { "platforms.discord": searchRegex }
        ];
    }

    return UserModel.find(findParameters)
        .sort({ "_id": -1 })
        .skip(skip)
        .limit(limit)
        .populate("association")
        .exec();
}
