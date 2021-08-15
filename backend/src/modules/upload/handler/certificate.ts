import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UploadLib from "../lib";
import { generateName } from "../lib";
import * as UserLib from "@/modules/user/lib";
import { EStudentStatus } from "@/modules/user/model";

const SchemaResponse = Type.Object({
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
        "/upload/certificate",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);

            const files = await request.saveRequestFiles({
                limits: {
                    files: 1,
                    fileSize: 8 * 1024 * 1024
                }
            });

            let fileName;

            if (files[0].mimetype === "application/pdf") {
                fileName = `${ generateName("certificate") }.pdf`;
                await UploadLib.moveFile(files[0], {
                    fileName,
                    path: `upload/user/${ user._id }`
                });
            }
            else {
                fileName = `${ generateName("certificate") }.webp`;

                await UploadLib.processImage(files[0], {
                    fileName,
                    path: `upload/user/${ user._id }`,
                    size: 1280
                });
            }

            if (user.student.certificate) {
                UploadLib.deleteFile(`upload/user/${ user._id }/${ user.student.certificate }`);
            }

            user.student.certificate = fileName;
            user.student.status = EStudentStatus.Processing;
            await user.save();

            reply.send({
                message: "Votre certificat a correctement été uploadé.",
                success: true
            });
        }
    );
}
