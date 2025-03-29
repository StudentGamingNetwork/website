import Crypto from "crypto";
import httpErrors from "http-errors";
import SessionModel, { ISessionDocument } from "@/modules/session/model";

export async function generate(userId: string, machine: {host: string; userAgent: string}, twoFactorAuth = false): Promise<ISessionDocument> {
    const token = Crypto.randomBytes(32).toString("hex");
    const tempToken = twoFactorAuth ? Crypto.randomBytes(32).toString("hex") : undefined;

    const creationDate = new Date();
    const expirationDate = new Date();
    if (twoFactorAuth){
        expirationDate.setUTCSeconds(expirationDate.getUTCSeconds() + 60);
    }
    else {
        expirationDate.setDate(expirationDate.getDate() + 365); 
    }
    

    return SessionModel.create({
        dates: {
            creation: creationDate.toISOString(),
            expiration: expirationDate.toISOString()
        },
        machine,
        tempToken,
        token,
        twoFactorAuth,
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

export async function validate(session: ISessionDocument): Promise<ISessionDocument> {
    assertValidity(session.userId, session.token);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365); 
    session.dates.expiration = expirationDate;
    
    return session;
}

export async function getSessionByTempToken(tempToken: string) {

    const session = await SessionModel.findOne({
        tempToken 
    }).exec();

    if (!session) {
        return null;
    }

    return session;
}


