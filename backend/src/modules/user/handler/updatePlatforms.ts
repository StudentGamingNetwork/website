import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "../lib";
import { IUserDocument } from "@/modules/user/model";

const UserUpdatePlatforms = Type.Object({
    platforms: Type.Object({
        discord: Type.String()
    })
});

type TUserUpdatePlatforms = Static<typeof UserUpdatePlatforms>;

const UserUpdatePlatformsResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TUserUpdatePlatformsResponse = Static<typeof UserUpdatePlatformsResponse>;

const schema = {
    body: UserUpdatePlatforms,
    response: {
        200: UserUpdatePlatformsResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TUserUpdatePlatforms; Response: TUserUpdatePlatformsResponse }>(
        "/updatePlatforms",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            await update(user, request.body);

            reply.send({
                message: "Votre profil a correctement été mis à jour.",
                success: true
            });
        }
    );
}

async function update(user: IUserDocument, update: TUserUpdatePlatforms) {

    if (!user.platforms) {
        user.platforms = {};
    }

    user.platforms.discord = update.platforms.discord;

    await user.save();
}
