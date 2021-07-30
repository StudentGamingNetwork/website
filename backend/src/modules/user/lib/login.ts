import * as Bcrypt from "bcryptjs";
import httpErrors from "http-errors";
import UserModel, { IUserDocument } from "../model";

export async function login(mail: string, password: string): Promise<IUserDocument> {

    const userModel = await UserModel.findOne({
        mail
    });

    if (!userModel) {
        throw new httpErrors.NotFound("Aucun utilisateur trouvé avec cette adresse mail");
    }

    const isPasswordCorrect = Bcrypt.compareSync(password, userModel.password);

    if (!isPasswordCorrect) {
        throw new httpErrors.Unauthorized("Mot de passe incorrect");
    }

    return userModel;
}
