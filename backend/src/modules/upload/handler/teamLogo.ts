import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UploadLib from "../lib";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";
import TeamModel from "@/modules/team/model";

const SchemaParams = Type.Object({
    id: Type.String({ minLength: 1 })
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaResponse = Type.Object({
    logo: Type.String(),
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    params: SchemaParams,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Params: TSchemaParams; Response: TSchemaResponse }>(
        "/:id/upload/logo",
        { schema },
        async (request, reply) => {
            const team = await TeamModel.findById(request.params.id);

            if (!team) {
                throw new httpErrors.NotFound("Aucune équipe trouvée.");
            }

            const user = await UserLib.getUser(request);

            if (team.owner.toString() !== user.id) {
                throw new httpErrors.Forbidden("Vous n'êtes pas autorisé à modifier ce logo.");
            }

            const files = await request.saveRequestFiles({
                limits: {
                    files: 1,
                    fileSize: 8 * 1024 * 1024
                }
            });

            const fileName = `${ UploadLib.generateName("logo") }.webp`;

            await UploadLib.processImage(files[0], {
                fileName,
                path: `upload/team/${ team.id }`,
                size: 512
            });

            if (team.settings.logo) {
                UploadLib.deleteFile(`upload/team/${ team.id }/${ team.settings.logo }`);
            }

            team.settings.logo = fileName;
            await team.save();

            reply.send({
                logo: team.settings.logo,
                message: "Votre logo a correctement été uploadé.",
                success: true
            });
        }
    );
}
