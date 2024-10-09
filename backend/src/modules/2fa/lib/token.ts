import { createCipheriv, createDecipheriv } from "crypto";
import { authenticator, totp } from "otplib";
import httpErrors from "http-errors";

totp.options = { digits: 6 };


function createSecret(text) {
    const cipher = createCipheriv("aes-256-cbc", Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { encryptedData: encrypted.toString("hex"), iv: iv.toString("hex") };
}

function decryptSecret(text) {
    const iv = Buffer.from(text.iv, "hex");
    const encryptedText = Buffer.from(text.encryptedData, "hex");
    const decipher = createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}


export function verifyToken(token: string, secret: string): boolean {
    if (!token) {
        throw new httpErrors.BadRequest("Le token est manquant.");
    }

    return totp.verify({ secret, token });
}

export function generateSecret(): string {
    return authenticator.generateSecret();
}

export function generateToken(secret: string): string {
    return totp.generate(secret);
}
