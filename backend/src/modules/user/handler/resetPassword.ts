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

            await TokenModel.updateMany(
                {
                    expirationDate: { $gt: date },
                    used: false,
                    user: user._id
                },
                { $set: { used: true } }
            );

            const passwordToken = await TokenModel.create({
                expirationDate: new Date(date.getTime() + 60 * 60 * 1000),
                token: (await generateToken()).replaceAll("/", "").replaceAll("\\", ""),
                used: false,
                user: user._id
            });

            await UserLib.sendMail(
                user.mail,
                user.username,
                "Réinitialisation du mot de passe",
                `https://sgnw.fr/reset-password/${ passwordToken.token }`
            );
            

            reply.send({
                message: "Si le compte existe, un mail a été envoyé à l'addresse lié.",
                success: true
            });
        }
    );
}
