import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UploadLib from "../lib";
import * as UserLib from "@/modules/user/lib";
import AssociationModel from "@/modules/association/model";

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
            const user = await UserLib.getUser(request);

            if (!user.association) {
                throw new httpErrors.Forbidden("Vous n'êtes pas dans une association.");
            }

            const association = await AssociationModel.findOne({ _id: user.association });

            if (!association) {
                throw new httpErrors.NotFound("L'association est introuvable.");
            }

            if (association.users.owner.toString() !== user.id.toString()) {
                throw new httpErrors.Forbidden("Vous n'êtes pas propriétaire de cette association.");
            }

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
