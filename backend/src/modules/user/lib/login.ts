import * as Bcrypt from "bcryptjs";
import httpErrors from "http-errors";
import { OAuth2Client } from "google-auth-library";
import UserModel from "../model";
import { ISessionDocument } from "@/modules/session/model";
import * as SessionLib from "@/modules/session/lib";
import { env } from "@/utils/environment";


export async function login(mail: string, password: string, machine: {host: string; userAgent: string}): Promise<ISessionDocument> {

    const user = await UserModel.findOne({
        mail
    });

    if (!user) {
        throw new httpErrors.NotFound("Aucun utilisateur trouvé avec cette adresse mail");
    }

    const isPasswordCorrect = Bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
        throw new httpErrors.Forbidden("Mot de passe incorrect");
    }
    
    return await SessionLib.generate(user.id, machine, user.twoFactorAuth?.enabled);
}

export async function googleLogin(code: string, machine: {host: string; userAgent: string}): Promise<ISessionDocument> {
    const client = getOauth2Client();
    
    try {
        const { tokens } = await client.getToken(code);
    
        if (!tokens.id_token) {
            throw new httpErrors.BadRequest("Aucun token reçu");
        }
       
        const ticket = await client.verifyIdToken({
            audience: env.GOOGLE_OAUTH_CLIENT_ID,
            idToken: tokens.id_token
        });
        
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            throw new httpErrors.BadRequest("Token Google invalide");
        }
        
        const googleEmail = payload.email;

        const user = await UserModel.findOne({
            $or: [
                { mail: googleEmail },
                { "platforms.googleMail": googleEmail }
            ]
        });

        if (!user) {
            throw new httpErrors.NotFound("Aucun compte associé à cette adresse mail");
        }
        
        return await SessionLib.generate(user.id, machine, user.twoFactorAuth?.enabled);
    }
    catch (error) {        
        if (error instanceof httpErrors.HttpError) {
            throw error;
        }
        throw new httpErrors.BadRequest(`Erreur lors de la vérification du code Google: ${ (error as Error).message }`);
    }
}


function getOauth2Client() {
    return new OAuth2Client(
        { 
            clientId: env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET,
            redirectUri: env.GOOGLE_OAUTH_REDIRECT_URL 
        }
    );
}
