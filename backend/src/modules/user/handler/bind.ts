import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../lib";

const UserBind = Type.Object({
    code: Type.String(),
    service: Type.String()
});


type TUserBind = Static<typeof UserBind>;

const UserBindResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TUserBindResponse = Static<typeof UserBindResponse>;

const schema = {
    body: UserBind,
    response: {
        200: UserBindResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TUserBind; Response: TUserBindResponse }>(
        "/bind",
        { schema },
        async (request, reply) => {
            
            const user = await UserLib.getUser(request);

            let payload;

            if (request.body.service === "google") {
                payload = await UserLib.googleVerifyCode(request.body.code);


                if (await UserLib.isMailAlreadyRegisteredGoogle(payload.email) || (await UserLib.isMailAlreadyRegistered(payload.email) && user.mail !== payload.email)) {
                    throw new Error("Cette adresse mail est déjà utilisée");
                }

                user.platforms.google = payload.email;
                
                await user.save();
            }           

            reply.send({
                message: "Votre profil a correctement été mis à jour.",
                success: true
            });
        }
    );
}
