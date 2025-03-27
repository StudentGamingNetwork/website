import { authenticator } from "otplib";
import httpErrors from "http-errors";

authenticator.options = {
    digits: 6,
    step: 30,
    window: [1, 0]
};


export function verifyToken(token: string, secret: string): boolean {
    if (!token) {
        throw new httpErrors.BadRequest("Le token est manquant.");
    }
    
    
    return authenticator.check(token, secret);
}

export function generateSecret(mail: string): [string, string] {
    
    const secret = authenticator.generateSecret();
    return [authenticator.keyuri(mail, "SGN", secret), secret];
    
}

