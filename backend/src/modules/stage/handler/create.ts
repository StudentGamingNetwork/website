import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";
import { EStageGrandFinal, EStageMatchFormat } from "@/modules/stage/lib";
import StageModel from "@/modules/stage/model";
import * as TournamentLib from "@/modules/tournament/lib";

const SchemaBody = Type.Object({
    name: Type.String(),
    slug: Type.String(),
    type: Type.String()
});

const SchemaResponse = Type.Object({
    id: Type.String(),
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaBody = Static<typeof SchemaBody>;
type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TSchemaBody; Response: TSchemaResponse }>(
        "/create",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament]);

            const tournament = await TournamentLib.getTournamentFromSlug(request.body.slug);
            if (!tournament) {
                throw new httpErrors.NotFound("Le tournoi n'existe pas.");
            }

            const stage = await StageModel.create({
                name: request.body.name,
                advanced: {
                    qualifiedThreshold: 0
                },
                general: {
                    grandFinal: EStageGrandFinal.NONE,
                    size: 0,
                    thirdPlace: false
                },
                matchSettings: {
                    endWhenWinnerKnown: false,
                    format: EStageMatchFormat.NONE,
                    gamesNumber: 1,
                    scoreBasedCalculations: false
                },
                placement: false,
                tournament: tournament._id,
                type: request.body.type
            });

            reply.send({
                id: stage._id,
                message: "L'étape a correctement été créé.",
                success: true
            });
        }
    );
}
