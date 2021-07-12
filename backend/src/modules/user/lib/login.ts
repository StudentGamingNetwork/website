import * as Bcrypt from "bcryptjs";
import UserModel, { IUserDocument } from "../model";

export async function login(mail: string, password: string): Promise<IUserDocument> {

    const userModel = await UserModel.findOne({
        mail
    });

    if (!userModel) {
        throw new Error("User not found");
    }

    const isPasswordCorrect = Bcrypt.compareSync(password, userModel.password);

    if (!isPasswordCorrect) {
        throw new Error("Invalid password");
    }

    return userModel;
}
