import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../../user/lib";
import { ERoles } from "@/modules/user/model";
import { TypeAdminUser } from "@/modules/user/type";
import { userSearch } from "@/modules/admin/lib/search";

const SchemaRequest = Type.Object({
    limit: Type.Number({ default: 20, maximum: 100, minimum: 1 }),
    search: Type.Optional(Type.String()),
    skip: Type.Number({ default: 0, minimum: 0 })
});

type TSchemaRequest = Static<typeof SchemaRequest>;

const UserSearchResponse = Type.Object({
    users: Type.Array(TypeAdminUser),
    displayed: Type.Number()
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
            const displayed = 5;

            reply.send({
                users,
                displayed
            });
        }
    );
}
