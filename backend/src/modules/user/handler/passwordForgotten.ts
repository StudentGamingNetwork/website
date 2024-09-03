import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as Bcrypt from "bcryptjs";
import * as UserLib from "../lib";
import UserModel from "../model";
import UserConfig from "@/modules/user/config";

const UserPasswordForgotten = Type.Object({
    mail: Type.String({ format: "email" })
});

type TUserPasswordForgotten = Static<typeof UserPasswordForgotten>;

const UserPasswordForgottenResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TUserPasswordForgottenResponse = Static<typeof UserPasswordForgottenResponse>;

const schema = {
    body: UserPasswordForgotten,
    response: {
        200: UserPasswordForgottenResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TUserPasswordForgotten; Response: TUserPasswordForgottenResponse }>(
        "/passwordForgotten",
        { schema },
        async (request, reply) => {
            
            const user = await UserModel.findOne({
                mail: request.body.mail
            });

            if (user) {
              
                const newPassword = generatePassword();
                
                const passwordSalt = Bcrypt.genSaltSync(UserConfig.login.saltRound);
                user.password = Bcrypt.hashSync(newPassword, passwordSalt);

                user.save();

                await UserLib.sendMail(
                    process.env.NO_REPLY_EMAIL,
                    user.mail,
                    "Réinitialisation du mot de passe",
                    `Votre mot de passe a été réinitialisé. Votre nouveau mot de passe est : ${ newPassword }`
                );
            }

            reply.send({
                message: "Si le compte existe, un mail a été envoyé à l'addresse lié.",
                success: true
            });
        }
    );
}


function generatePassword() {
    const length = Math.floor(Math.random() * 24) + 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    return Array.from({ length }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join("");
}
