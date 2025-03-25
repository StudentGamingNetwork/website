import Crypto from "crypto";
import httpErrors from "http-errors";
import SessionModel, { ISessionDocument } from "@/modules/session/model";

export async function generate(userId: string, machine: {host: string; userAgent: string}): Promise<ISessionDocument> {
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
        userId
    });
}

export async function checkValidity(userId: string, token: string): Promise<boolean> {
    const session = await SessionModel.findOne({
        token,
        userId
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

export async function assertValidity(userId: string, token: string): Promise<void> {
    const validity = await checkValidity(userId, token);

    if (!validity) {
        throw new httpErrors.Unauthorized("Token de connexion non valide ou expiré");
    }
}
