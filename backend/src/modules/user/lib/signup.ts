import * as Bcrypt from "bcryptjs";
import UserModel from "../model";

const SALT_ROUND = 12;
const PASSWORD_MIN_LENGTH = 8;

export async function signup(login: string, mail: string, password: string): Promise<void> {
    if (!isPasswordStrong(password)) {
        throw new Error("Weak password");
    }

    const passwordSalt = Bcrypt.genSaltSync(SALT_ROUND);
    const passwordHash = Bcrypt.hashSync(password, passwordSalt);

    await UserModel.create({
        login,
        mail,
        password: passwordHash
    });
}

export function isPasswordStrong(password: string): boolean {
    if (password.length < PASSWORD_MIN_LENGTH) {
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

export function isMailAlreadyRegistered(email: string): boolean {
    return true;
}

export function isLoginAlreadyRegistered(login: string): boolean {
    return true;
}

export function isMailValid(email: string): boolean {
    return true;
}

export function isLoginValid(login: string): boolean {
    return true;
}

