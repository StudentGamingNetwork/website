import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UploadLib from "../lib";
import * as UserLib from "@/modules/user/lib";

const UserUpdateResponse = Type.Object({
    certificate: Type.String(),
    message: Type.String(),
    success: Type.Boolean()
});

type TUserUpdateResponse = Static<typeof UserUpdateResponse>;

const schema = {
    response: {
        200: UserUpdateResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: null; Response: TUserUpdateResponse }>(
        "/upload/avatar",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);

            const files = await request.saveRequestFiles({
                limits: {
                    files: 1,
                    fileSize: 8 * 1024 * 1024
                }
            });

            console.log(files);
            return;

            const fileName = `avatar-${ Date.now() }.webp`;

            await UploadLib.processImage(files[0], {
                fileName,
                path: `upload/user/${ user._id }`,
                size: 128
            });

            if (user.avatar) {
                UploadLib.deleteFile(`upload/user/${ user._id }/${ user.avatar }`);
            }

            user.avatar = fileName;
            await user.save();

            reply.send({
                avatar: user.avatar,
                message: "Votre certificat a correctement été uploadé.",
                success: true
            });
        }
    );
}
