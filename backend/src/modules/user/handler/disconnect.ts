import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import SessionModel from "@/modules/session/model";


const UserLoginResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TUserLoginResponse = Static<typeof UserLoginResponse>;

const schema = {
    response: {
        200: UserLoginResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Body: null; Response: TUserLoginResponse }>(
        "/disconnect",
        { schema },
        async (request, reply) => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            const parsedCookies = request.headers.cookie?.split(";");
            if (parsedCookies) {
                const [userId,token] = parsedCookies.map((cookie: string) => cookie.split("=")[1]); 
                const session = await SessionModel.findOne({
                    token,
                    userId
                }).exec();

                if (session) {
                    await session.deleteOne();
                }
                
            }
            reply.headers({
                "Set-Cookie": [
                    `userId=deleted;path=/;expires=${ yesterday.toUTCString() };SameSite=None;Secure`,
                    `token=deleted;path=/;expires=${ yesterday.toUTCString() };SameSite=None;Secure`
                ]
            }).send({
                message: "Vous êtes maintenant déconnecté.",
                success: true
            });
        }
    );
}
