import { merge } from "lodash";
import { EStageType, EStageGrandFinal, EStageGroupComposition, EStageMatchFormat, EStageParingMethod, TieBreakers, EStageMatchCalculation } from "./lib";
import { TTournament } from "@/modules/tournament";

export type TStage = {
    _id: string,
    name: string;
    advanced: {
        groupComposition?: EStageGroupComposition;
        matchForfeit: {
            activated: boolean;
            points: number;
        };
        matchResult: {
            activated: boolean;
            draw: number;
            loss: number;
            win: number;
        };
        matchScore: boolean;
        noOpponents: {
            activated: boolean;
            points: number;
        };
        pairingMethod: EStageParingMethod;
        qualifiedThreshold?: number;
        roundResult: {
            activated: boolean;
            draw: number;
            loss: number;
            win: number;
        };
        tieBreaker: Array<typeof TieBreakers>;
    };
    general: {
        grandFinal: EStageGrandFinal;
        groupNumber?: number;
        loserBracket?: boolean;
        size: number;
        skipFirstRound?: boolean;
        thirdPlace: boolean;
    };
    matchSettings: {
        endWhenWinnerKnown: boolean;
        format: EStageMatchFormat;
        gamesNumber: number;
        scoreBasedCalculations: EStageMatchCalculation;
    };
    number: number;
    placement: boolean;
    tournament: TTournament;
    type: EStageType;
}

export function makeObject(stage: Partial<TStage>): TStage {
    const basicStage = {
        _id: "",
        name: "",
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
            matchScore: {
                activated: false,
                draw: 0,
                loss: 0,
                win: 0
            },
            noOpponents: {
                activated: false,
                points: 0
            },
            qualifiedThreshold: 0,
            roundResult: {
                activated: false,
                draw: 0,
                loss: 0,
                win: 0
            },
            tieBreaker: []
        },
        general: {
            grandFinal: EStageGrandFinal,
            size: 0,
            thirdPlace: false
        },
        matchSettings: {
            endWhenWinnerKnown: false,
            format: EStageMatchFormat.NONE,
            gamesNumber: 0,
            scoreBasedCalculations: EStageMatchCalculation.NONE
        },
        number: 1,
        placement: false,
        tournament: "",
        type: EStageType.DUEL_SINGLE_ELIM
    };

    return merge(basicStage, stage);
}
