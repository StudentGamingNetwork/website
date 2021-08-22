import { FastifyInstance } from "fastify";
import { Static } from "@sinclair/typebox";
import * as UserLib from "../lib";
import * as AssociationLib from "@/modules/association/lib";
import { TypeOwnerUser } from "@/modules/user/type";

const UserPingResponse = TypeOwnerUser;

type TUserPingResponse = Static<typeof UserPingResponse>;

const schema = {
    response: {
        200: UserPingResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Body: null; Response: TUserPingResponse }>(
        "/ping",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);

            if (user.association) {
                await user
                    .populate("association")
                    .execPopulate();
            }

            const responseUser = user.toObject();

            if (responseUser.association) {
                responseUser.association = AssociationLib.sanitize(user, user.association);
            }

            reply.send(responseUser);
        }
    );
}
