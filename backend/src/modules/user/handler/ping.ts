import { FastifyInstance } from "fastify";
import { Static } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "../lib";
import * as AssociationLib from "@/modules/association/lib";
import { TypeOwnerUser } from "@/modules/user/type";
import SessionModel from "@/modules/session/model";

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

            const session = await SessionModel.findOne({
                $and: [{ userId: user.id }, { "dates.expiration": { $gt: new Date() } }]
            }).exec();

            if (!session) {
                throw new httpErrors.Unauthorized("Votre session n'est plus valide.");
            }

            const dateValidator = new Date();
            dateValidator.setDate(dateValidator.getDate() + 200);
            
            if (session.dates.expiration < dateValidator && user.twoFactorAuth?.enabled){
                throw new httpErrors.Forbidden("Vous n'avez pas valider votre token.");
            }


            if (user.association) {
                await user
                    .populate("association");
            }

            const responseUser = user.toObject();

            if (responseUser.association) {
                responseUser.association = AssociationLib.sanitize(user, user.association);
            }

            reply.send(responseUser);
        }
    );
}
