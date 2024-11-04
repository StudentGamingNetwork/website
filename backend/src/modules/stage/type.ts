import { Type } from "@sinclair/typebox";
import { EStageType, EStageGrandFinal, EStageGroupComposition, EStageMatchFormat, EStageParingMethod, EStageTieBreaker } from "./lib";

const Stage = {
    _id: Type.String(),
    name: Type.String(),
    advanced: Type.Object({
        gameResult: Type.Optional(Type.Object({
            draw: Type.Number(),
            loss: Type.Number(),
            win: Type.Number()
        })),
        groupComposition: Type.Optional(Type.Enum(EStageGroupComposition)),
        matchForfeit: Type.Optional(Type.Number()),
        matchResult: Type.Optional(Type.Object({
            draw: Type.Number(),
            loss: Type.Number(),
            win: Type.Number()
        })),
        matchScore: Type.Optional(Type.Object({
            draw: Type.Number(),
            loss: Type.Number(),
            win: Type.Number()
        })),
        pairingMethod: Type.Optional(Type.Enum(EStageParingMethod)),
        qualifiedThreshold: Type.Number(),
        tieBreaker: Type.Optional(Type.Array(Type.Any()))
    }),
    general: Type.Object({
        grandFinal: Type.Enum(EStageGrandFinal),
        groupNumber: Type.Optional(Type.Number()),
        loserBracket: Type.Optional(Type.Boolean()),
        size: Type.Number(),
        skipFirstRound: Type.Optional(Type.Boolean()),
        thirdPlace: Type.Boolean()
    }),
    matchSettings: Type.Object({
        endWhenWinnerKnown: Type.Boolean(),
        format: Type.Enum(EStageMatchFormat),
        gamesNumber: Type.Number(),
        scoreBasedCalculations: Type.Boolean()
    }),
    placement: Type.Boolean(),
    tournament: Type.String(),
    type: Type.Enum(EStageType)
};

export const TypeStage = Type.Object(Stage);
