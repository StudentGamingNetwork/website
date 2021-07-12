import * as Bcrypt from "bcryptjs";
import UserModel from "../model";
import UserConfig from "@/modules/user/config";

export async function signup(mail: string, password: string): Promise<void> {
    if (!isPasswordStrong(password)) {
        throw new Error("Weak password");
    }

    if (!isMailValid(mail)) {
        throw new Error("Invalid email format");
    }

    if (await isMailAlreadyRegistered(mail)) {
        throw new Error("Mail already registered");
    }

    const passwordSalt = Bcrypt.genSaltSync(UserConfig.login.saltRound);
    const passwordHash = Bcrypt.hashSync(password, passwordSalt);

    await UserModel.create({
        mail,
        password: passwordHash
    });
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
    return /\S+@\S+\.\S+/.test(mail);
}

