import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import Bcrypt from "bcryptjs";
import UserModel from "../model";
import TokenModel from "@/modules/token/model";
import UserConfig from "@/modules/user/config";

const PasswordUpdate = Type.Object({
    mail: Type.String({ format: "email" }),
    password: Type.String(),
    token: Type.String()
});


type TPasswordUpdate = Static<typeof PasswordUpdate>;

const PasswordUpdatetenResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TPasswordUpdateResponse = Static<typeof PasswordUpdatetenResponse>;

const schema = {
    body: PasswordUpdate,
    response: {
        200: PasswordUpdatetenResponse
    }
};


export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TPasswordUpdate; Response: TPasswordUpdateResponse }>(
        "/change-password",
        { schema },
        async (request, reply) => {
            
            const user = await UserModel.findOne({
                mail: request.body.mail
            });

            if (!user) {
                throw new httpErrors.NotFound("Aucun compte n'a été trouvé avec cette adresse mail.");
            }
            
            const token = await TokenModel.findOne({
                token: request.body.token,
                used: false,
                user: user._id
            });

            if (!token) {
                throw new httpErrors.Forbidden("Le token est invalide ou a expiré.");
            }
            
            token.used = true;
            await token.save();

            const passwordSalt = await Bcrypt.genSalt(UserConfig.login.saltRound);
            user.password = await Bcrypt.hash(request.body.password,passwordSalt);
            user.passwordLogin = true;
            await user.save();
            

            reply.send({
                message: "Mot de passe changé avec succès.",
                success: true
            });
        }
    );
}
