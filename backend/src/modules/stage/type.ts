import { Type } from "@sinclair/typebox";
import { EStageType, EStageGroupComposition, EStageParingMethod } from "./lib";
import { EStageGrandFinal, EStageMatchFormat } from "./model";

const Stage = {
    _id: Type.String(),
    name: Type.String(),
    advanced: Type.Object({
        groupComposition: Type.Optional(Type.Enum(EStageGroupComposition)),
        matchForfeit: Type.Object({
            activated: Type.Boolean(),
            points: Type.Number()
        }),
        matchResult: Type.Object({
            activated: Type.Boolean(),
            draw: Type.Number(),
            loss: Type.Number(),
            win: Type.Number()
        }),
        matchScore: Type.Boolean(),
        noOpponents: Type.Object({
            activated: Type.Boolean(),
            points: Type.Number()
        }),
        pairingMethod: Type.Enum(EStageParingMethod),
        qualifiedThreshold: Type.Optional(Type.Number()),
        roundResult: Type.Object({
            activated: Type.Boolean(),
            draw: Type.Number(),
            loss: Type.Number(),
            win: Type.Number()
        }),
        roundScore: Type.Boolean(),
        tieBreaker: Type.Array(Type.Any())
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
    number: Type.Number(),
    placement: Type.Boolean(),
    tournament: Type.String(),
    type: Type.Enum(EStageType)
};

export const TypeStage = Type.Object(Stage);
