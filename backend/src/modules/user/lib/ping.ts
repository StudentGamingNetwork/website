import httpErrors from "http-errors";
import * as SessionLib from "@/modules/session/lib";
import UserModel, { IUserDocument } from "@/modules/user/model";

export async function ping(cookies: {token: string; userId: string}): Promise<IUserDocument> {

    console.log(cookies);
    await SessionLib.assertValidity(cookies.userId, cookies.token);

    const user = await UserModel.findOne({
        _id: cookies.userId
    });

    if (!user) {
        throw new httpErrors.NotFound("Aucun utilisateur trouvé");
    }

    return user;
}
