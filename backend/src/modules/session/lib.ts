import Crypto from "crypto";
import { IUserDocument } from "@/modules/user/model";
import SessionModel, { ISessionDocument } from "@/modules/session/model";

export async function generate(user: IUserDocument, machine: {host: string; userAgent: string}): Promise<ISessionDocument> {
    const token = Crypto.randomBytes(32).toString("hex");

    const creationDate = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);

    return SessionModel.create({
        dates: {
            creation: creationDate.toISOString(),
            expiration: expirationDate.toISOString()
        },
        machine,
        token,
        user: user.id
    });
}

export async function checkValidity(user: IUserDocument, token: string): Promise<boolean> {
    const session = await SessionModel.findOne({
        token,
        user: user.id
    }).exec();

    if (!session) {
        return false;
    }

    if (new Date(session.dates.expiration).getTime() < new Date().getTime()) {
        await SessionModel.deleteOne({ id: session.id });
        return false;
    }

    return true;
}
