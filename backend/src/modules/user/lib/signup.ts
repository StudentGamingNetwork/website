import * as Bcrypt from "bcryptjs";
import httpErrors from "http-errors";
import UserModel from "../model";
import UserConfig from "@/modules/user/config";
import * as SessionLib from "@/modules/session/lib";
import { ISessionDocument } from "@/modules/session/model";

export async function signup(mail: string, password: string, machine: {host: string; userAgent: string}): Promise<ISessionDocument> {
    if (!isPasswordStrong(password)) {
        throw new httpErrors.BadRequest("Le mot de passe n'est pas assez solide.");
    }

    if (!isMailValid(mail)) {
        throw new Error("L'adresse mail n'a pas un bon format.");
    }

    if (await isMailAlreadyRegistered(mail)) {
        throw new Error("Cette adresse mail est déjà utilisée");
    }

    const passwordSalt = Bcrypt.genSaltSync(UserConfig.login.saltRound);
    const passwordHash = Bcrypt.hashSync(password, passwordSalt);

    const user = await UserModel.create({
        mail,
        password: passwordHash,
        roles: [],
        subscriptionDate: new Date(),
        username: mail.split("@")[0]
    });

    return await SessionLib.generate(user.id, machine, !!user.twoFactorAuth?.enabled);
}

export function isPasswordStrong(password: string): boolean {
    if (password.length < UserConfig.login.passwordMinLength) {
        return false;
    }

    const doesContainNumber = /[0-9]/.test(password);
    if (!doesContainNumber) {
        return false;
    }

    const doesContainUppercaseLetter = /[A-Z]/.test(password);
    if (!doesContainUppercaseLetter) {
        return false;
    }

    const doesContainLowercaseLetter = /[a-z]/.test(password);
    if (!doesContainLowercaseLetter) {
        return false;
    }

    return true;
}

export async function isMailAlreadyRegistered(mail: string): Promise<boolean> {
    const userModel = await UserModel.findOne({
        mail
    });

    return !!userModel;
}

export function isMailValid(mail: string): boolean {
    const mailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return mailRegex.test(mail);
}
