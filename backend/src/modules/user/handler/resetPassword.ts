import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "../lib";
import UserModel from "../model";
import TokenModel from "@/modules/token/model";
import { generateToken } from "@/modules/token/libs/index";

const UserPasswordForgotten = Type.Object({
    mail: Type.Optional(Type.String({ format: "email" }))
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
        "/reset-password",
        { schema },
        async (request, reply) => {
            
            const user = await UserModel.findOne({
                mail: request.body.mail
            });

            if (!user) {
                throw new httpErrors.NotFound("Aucun compte n'a été trouvé avec cette adresse mail.");
            }

            const date = new Date();
            const passwordToken = await TokenModel.create({
                expirationDate: date.setDate(date.getDate() + 3),
                token: await generateToken(),
                used: false,
                user: user._id
            });

            await UserLib.sendMail(
                user.mail,
                "Réinitialisation du mot de passe",
                `Cliquez sur ce <a href='https://sgnw.fr/reset-password/${ passwordToken.token }'>lien</a> pour réinitialiser votre mot de passe.<br/>Ce lien sera valide pendant 3 jours.`
            );
            

            reply.send({
                message: "Si le compte existe, un mail a été envoyé à l'addresse lié.",
                success: true
            });
        }
    );
}
