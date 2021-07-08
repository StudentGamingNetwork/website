import * as Bcrypt from "bcryptjs";
import UserModel, { IUserDocument } from "../model";

export async function login(login: string, password: string): Promise<IUserDocument> {

    const userModel = await UserModel.findOne({
        login
    });

    if (!userModel) {
        throw new Error("[userModule][login] - User not found");
    }

    const isPasswordCorrect = Bcrypt.compareSync(password, userModel.password);

    if (!isPasswordCorrect) {
        throw new Error("[userModule][login] - password don't match");
    }

    return userModel;
}
