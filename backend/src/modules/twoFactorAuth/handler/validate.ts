import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import SessionModel from "@/modules/session/model";
import * as UserLib from "@/modules/user/lib";

const SchemaResponse = Type.Object({
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Body: null; Response: TSchemaResponse }>(
        "/validate",
        { schema },
        async (request, reply) => {
            
            const user = await UserLib.getUser(request);

            if (!user) {
                throw new httpErrors.Unauthorized("Vous devez être connecté pour accéder à cette ressource.");
            }

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

            reply.send({ success: true });
        }
    );
}
