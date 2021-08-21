import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UploadLib from "../lib";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";
import TournamentModel from "@/modules/tournament/model";

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
        "/upload/logo/:id",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament]);

            const tournament = await TournamentModel.findById(request.params.id);

            if (!tournament) {
                throw new httpErrors.NotFound("Aucun tournoi trouvé.");
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
                path: `upload/tournament/${ tournament.id }`,
                size: 512
            });

            if (tournament.settings.logo) {
                UploadLib.deleteFile(`upload/tournament/${ tournament.id }/${ tournament.settings.logo }`);
            }

            tournament.settings.logo = fileName;
            await tournament.save();

            reply.send({
                logo: tournament.settings.logo,
                message: "Votre logo a correctement été uploadé.",
                success: true
            });
        }
    );
}
