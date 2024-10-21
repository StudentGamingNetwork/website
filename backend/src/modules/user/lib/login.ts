import * as Bcrypt from "bcryptjs";
import httpErrors from "http-errors";
import UserModel from "../model";
import { ISessionDocument } from "@/modules/session/model";
import * as SessionLib from "@/modules/session/lib";

export async function login(mail: string, password: string, machine: {host: string; userAgent: string}): Promise<ISessionDocument> {

    const user = await UserModel.findOne({
        mail
    });

    if (!user) {
        throw new httpErrors.NotFound("Aucun utilisateur trouvé avec cette adresse mail");
    }

    const isPasswordCorrect = Bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
        throw new httpErrors.Forbidden("Mot de passe incorrect");
    }
    
    return await SessionLib.generate(user.id, machine, typeof user.twoFactorAuth?.enabled !== "undefined");
}
