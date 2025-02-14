import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import { EStageGrandFinal, EStageMatchFormat, EStageType , EStageParingMethod , EStageMatchCalculation } from "../enum";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";
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

            if (!tournament.stages) {
                tournament.stages = [];
            }

            const stage = await StageModel.create({
                name: "New stage",
                advanced: {
                    matchForfeit: {
                        activated: false,
                        points: 0
                    },
                    matchResult: {
                        activated: false,
                        draw: 0,
                        loss: 0,
                        win: 0
                    },
                    matchScore: false,
                    noOpponents: {
                        activated: false,
                        points: 0
                    },
                    pairingMethod: EStageParingMethod.BALANCED,
                    roundResult: {
                        activated: false,
                        draw: 0,
                        loss: 0,
                        win: 0
                    },
                    roundScore: false,
                    tieBreaker: []
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
                    scoreBasedCalculations: EStageMatchCalculation.NONE
                },
                number: (tournament.stages ? tournament.stages.length : 0) + 1,
                placement: false,
                tournament: tournament._id,
                type: EStageType.DUEL_BRACKET_GROUPS
            });

            tournament.stages = [...(tournament.stages || []), stage._id];

            await tournament.save();

            reply.send({
                id: stage._id,
                message: "L'étape a correctement été créé.",
                success: true
            });
        }
    );
}
