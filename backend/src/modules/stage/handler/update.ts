import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import { EStageGroupComposition, EStageParingMethod , EStageGrandFinal, EStageMatchFormat, EStageType , EStageMatchCalculation } from "../enum";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";
import StageModel from "@/modules/stage/model";
import { TypeStage } from "@/modules/stage/type";

const SchemaParams = Type.Object({
    id: Type.String({ minLength: 1 })
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaRequest = Type.Partial(TypeStage);

type TSchemaRequest = Static<typeof SchemaRequest>;

const SchemaResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    body: SchemaRequest,
    params: SchemaParams,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TSchemaRequest; Params: TSchemaParams; Response: TSchemaResponse }>(
        "/update/:id",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament]);

            const stage = await StageModel.findById(request.params.id);

            if (!stage) {
                throw new httpErrors.NotFound("Aucun tournoi trouvé.");
            }

            const stages = await StageModel.find({ tournament: stage.tournament });

            if (stages.some(s => {
                s._id !== request.body._id && s.number === request.body.number;
            })) {
                throw new httpErrors.Conflict("Une étape avec ce numéro existe déjà.");
            }
         
            if (stage.number < 1){
                throw new httpErrors.BadRequest("Le numéro de l'étapê doit être supérieur à 0.");
            }

            console.log(request.body.advanced?.matchResult.activated);
            
            stage.name = request.body.name || "";
            stage.number = request.body.number || 1;
            stage.placement = request.body.placement || false;
            stage.general.grandFinal = request.body.general?.grandFinal || EStageGrandFinal.NONE;
            stage.general.groupNumber = request.body.general?.groupNumber || undefined;
            stage.general.loserBracket = request.body.general?.loserBracket || false;
            stage.general.size = request.body.general?.size || 0;
            stage.general.skipFirstRound = request.body.general?.skipFirstRound || false;
            stage.general.thirdPlace = request.body.general?.thirdPlace || false;
            stage.matchSettings.endWhenWinnerKnown = request.body.matchSettings?.endWhenWinnerKnown || false;
            stage.matchSettings.format = request.body.matchSettings?.format || EStageMatchFormat.NONE;
            stage.matchSettings.gamesNumber = request.body.matchSettings?.gamesNumber || 0;
            stage.matchSettings.scoreBasedCalculations = request.body.matchSettings?.scoreBasedCalculations || EStageMatchCalculation.NONE;
            stage.advanced.groupComposition = request.body.advanced?.groupComposition || EStageGroupComposition.ADJACENT;
            stage.advanced.matchForfeit.activated = request.body.advanced?.matchForfeit.activated || false;
            stage.advanced.matchForfeit.points = request.body.advanced?.matchForfeit.points || 0;
            stage.advanced.matchResult.activated = request.body.advanced?.matchResult.activated || false;
            stage.advanced.matchResult.draw = request.body.advanced?.matchResult.draw || 0;
            stage.advanced.matchResult.loss = request.body.advanced?.matchResult.loss || 0;
            stage.advanced.matchResult.win = request.body.advanced?.matchResult.win || 0;
            stage.advanced.matchScore = request.body.advanced?.matchScore || false;
            stage.advanced.noOpponents.activated = request.body.advanced?.noOpponents.activated || false;
            stage.advanced.noOpponents.points = request.body.advanced?.noOpponents.points || 0;
            stage.advanced.pairingMethod = request.body.advanced?.pairingMethod || EStageParingMethod.BALANCED;
            stage.advanced.qualifiedThreshold = request.body.advanced?.qualifiedThreshold || undefined;
            stage.advanced.roundResult.activated = request.body.advanced?.roundResult.activated || false;
            stage.advanced.roundResult.draw = request.body.advanced?.roundResult.draw || 0;
            stage.advanced.roundResult.loss = request.body.advanced?.roundResult.loss || 0;
            stage.advanced.roundResult.win = request.body.advanced?.roundResult.win || 0;
            stage.advanced.roundScore = request.body.advanced?.roundScore || false;
            stage.advanced.tieBreaker = request.body.advanced?.tieBreaker || [];
            stage.tournament = request.body.tournament || stage.tournament;
            stage.type = request.body.type || EStageType.DUEL_BRACKET_GROUPS;
            

            await stage.save();

            reply.send({
                message: "L'étape a correctement été mis à jour.",
                success: true
            });
        }
    );
}
