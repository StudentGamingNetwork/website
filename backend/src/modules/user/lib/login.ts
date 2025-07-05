import Bcrypt from "bcryptjs";
import httpErrors from "http-errors";
import UserModel from "../model";
import { googleVerifyCode } from "./connection";
import { ISessionDocument } from "@/modules/session/model";
import * as SessionLib from "@/modules/session/lib";


export async function login(mail: string, password: string, machine: { host: string; userAgent: string }): Promise<ISessionDocument> {

    const user = await UserModel.findOne({
        mail
    });

    if (!user) {
        throw new httpErrors.NotFound("Aucun utilisateur trouvé avec cette adresse mail");
    }

    if (!user.passwordLogin) {
        throw new httpErrors.Forbidden("Connexion par mot de passe non authorisée");
    }

    const isPasswordCorrect = Bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
        throw new httpErrors.Forbidden("Mot de passe incorrect");
    }
    
    return await SessionLib.generate(user.id, machine, user.twoFactorAuth?.enabled);
}

export async function googleLogin(code: string, machine: { host: string; userAgent: string }): Promise<ISessionDocument> {
    const payload = await googleVerifyCode(code);

    const googleEmail = payload.email;

    const user = await UserModel.findOne({
        "platforms.google": googleEmail 
    });

    if (!user) {
        throw new httpErrors.NotFound("Aucun compte associé à cette adresse mail");
    }
        
    return await SessionLib.generate(user.id, machine, user.twoFactorAuth?.enabled);
    
}
