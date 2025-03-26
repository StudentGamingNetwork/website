import moment from "moment-timezone";
import { authenticator } from "otplib";
import httpErrors from "http-errors";


export function verifyToken(token: string, secret: string): boolean {
    if (!token) {
        throw new httpErrors.BadRequest("Le token est manquant.");
    }
    
    const epoch = moment().tz("Europe/Paris").valueOf();
    authenticator.options = { epoch };
    
    return authenticator.check(token, secret);
}

export function generateSecret(mail: string): [string, string] {
    const secret = authenticator.generateSecret();
    return [authenticator.keyuri(mail, "SGN", secret), secret];
    
}

