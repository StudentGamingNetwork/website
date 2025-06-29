import { FastifyRequest } from "fastify";
import httpErrors from "http-errors";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { Cookie } from "@/utils";
import * as SessionLib from "@/modules/session/lib";
import UserModel, { ERoles, IUserDocument } from "@/modules/user/model";
import { env } from "@/utils/environment";

export async function getUser(request: FastifyRequest): Promise<IUserDocument> {
    if (!request.headers.cookie) {
        throw new httpErrors.Unauthorized("Vous n'êtes pas connecté.");
    }

    const cookies = Cookie.decode(request.headers.cookie);

    await SessionLib.assertValidity(cookies.userId, cookies.token);

    const user = await UserModel.findOne({
        _id: cookies.userId
    });

    if (!user) {
        throw new httpErrors.NotFound("Aucun utilisateur trouvé.");
    }

    return user;
}

export function hasRoles(user: IUserDocument, roles: Array<ERoles>): boolean {
    if (user.roles.includes(ERoles.Admin)) {
        return true;
    }

    for (const role of roles) {
        if (!user.roles.includes(role)) {
            return false;
        }
    }

    return true;
}

export function assertRoles(user: IUserDocument, roles: Array<ERoles>): void {
    if (!hasRoles(user, roles)) {
        throw new httpErrors.Forbidden("Niveau d'autorisation trop faible.");
    }
}


export async function isMailAlreadyRegistered(mail: string): Promise<boolean> {
    const userModel = await UserModel.findOne({
        mail
    });

    return !!userModel;
}

export async function isMailAlreadyRegisteredGoogle(mail: string): Promise<boolean> {
    const userModel = await UserModel.findOne({
        "platforms.google": mail 
    });

    return !!userModel;
}


export function getOauth2Client() {
    return new OAuth2Client(
        { 
            clientId: env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET,
            redirectUri: env.GOOGLE_OAUTH_REDIRECT_URL 
        }
    );
}


export async function googleVerifyCode(code: string): Promise<TokenPayload> {
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

        return payload;
    }
    catch (error) {        
        if (error instanceof httpErrors.HttpError) {
            throw error;
        }
        throw new httpErrors.BadRequest(`Erreur lors de la vérification du code Google : ${ (error as Error).message }`);
    }
}
