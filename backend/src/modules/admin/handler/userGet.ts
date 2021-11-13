import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../../user/lib";
import UserModel, { ERoles } from "@/modules/user/model";
import { TypeAdminUser } from "@/modules/user/type";

const SchemaRequest = Type.Object({
    id: Type.String()
});

type TSchemaRequest = Static<typeof SchemaRequest>;

const UserSearchResponse = TypeAdminUser;

type TUserSearchResponse = Static<typeof UserSearchResponse>;

const schema = {
    params: SchemaRequest,
    response: {
        200: UserSearchResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Params: TSchemaRequest; Response: TUserSearchResponse }>(
        "/user/:id",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member]);

            const student = await UserModel
                .findOne({
                    "_id": request.params.id
                })
                .populate("association")
                .exec();

            reply.send(student);
        }
    );
}
