import Crypto from "crypto";

export function generateInvitationCode(): string {
    const code = Crypto.randomBytes(8).toString("hex").toUpperCase();
    return code.match(/.{4}/g)?.join("-") as string;
}
