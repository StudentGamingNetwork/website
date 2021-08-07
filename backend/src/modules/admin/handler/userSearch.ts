import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../../user/lib";
import UserModel, { ERoles, IUserDocument } from "@/modules/user/model";
import { TypeAdminUser } from "@/modules/user/type";

const UserSearch = Type.Object({
    limit: Type.Number({ default: 20, maximum: 50, minimum: 1 }),
    search: Type.Optional(Type.String()),
    skip: Type.Number({ default: 0, minimum: 0 })
});

type TUserSearch = Static<typeof UserSearch>;

const UserSearchResponse = Type.Object({
    users: Type.Array(TypeAdminUser)
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
        findParameters.$or = [
            { "name": new RegExp(search, "gi") },
            { "username": new RegExp(search, "gi") },
            { "mail": new RegExp(search, "gi") }
        ];
    }

    return UserModel.find(findParameters)
        .sort({ "_id": -1 })
        .skip(skip)
        .limit(limit)
        .populate("association")
        .exec();

}
