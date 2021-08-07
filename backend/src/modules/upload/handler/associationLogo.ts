import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UploadLib from "../lib";
import * as AssociationLib from "@/modules/association/lib";

const UserUpdateResponse = Type.Object({
    logo: Type.String(),
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
        "/upload/logo",
        { schema },
        async (request, reply) => {
            const association = await AssociationLib.getOwningAssociation(request);

            const files = await request.saveRequestFiles({
                limits: {
                    files: 1,
                    fileSize: 8 * 1024 * 1024
                }
            });

            const fileName = `logo-${ Date.now() }.webp`;

            await UploadLib.processImage(files[0], {
                fileName,
                path: `upload/association/${ association.id }`,
                size: 512
            });

            if (association.logo) {
                UploadLib.deleteFile(`upload/association/${ association.id }/${ association.logo }`);
            }

            association.logo = fileName;
            await association.save();

            reply.send({
                logo: association.logo,
                message: "Votre avatar a correctement été uploadé.",
                success: true
            });
        }
    );
}
