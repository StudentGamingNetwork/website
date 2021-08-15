import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UploadLib from "../lib";
import { generateName } from "../lib";
import * as UserLib from "@/modules/user/lib";

const SchemaResponse = Type.Object({
    avatar: Type.String(),
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: null; Response: TSchemaResponse }>(
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

            const fileName = `${ generateName("avatar") }.webp`;

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
                message: "Votre avatar a correctement été uploadé.",
                success: true
            });
        }
    );
}
