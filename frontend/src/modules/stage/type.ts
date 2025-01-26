import { merge } from "lodash";
import { EStageType, EStageGrandFinal, EStageGroupComposition, EStageMatchFormat, EStageParingMethod, TieBreakers } from "./lib";
import { TTournament } from "@/modules/tournament";

export type TStage = {
    _id: string,
    name: string;
    advanced: {
        groupComposition?: EStageGroupComposition;
        matchForfeit: {
            enabled: boolean;
            points: number;
        };
        matchResult: {
            draw: number;
            enabled: boolean;
            loss: number;
            win: number;
        };
        matchScore: boolean;
        noOpponents: {
            enabled: boolean;
            points: number;
        };
        pairingMethod: EStageParingMethod;
        qualifiedThreshold?: number;
        roundResult: {
            draw: number;
            enabled: boolean;
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
        scoreBasedCalculations: boolean;
    };
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
                enabled: false,
                points: 0
            },
            matchResult: {
                draw: 0,
                enabled: false,
                loss: 0,
                win: 0
            },
            matchScore: {
                draw: 0,
                enabled: false,
                loss: 0,
                win: 0
            },
            noOpponents: {
                enabled: false,
                points: 0
            },
            qualifiedThreshold: 0,
            roundResult: {
                draw: 0,
                enabled: false,
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
            scoreBasedCalculations: false
        },
        placement: false,
        tournament: "",
        type: EStageType.DUEL_SINGLE_ELIM
    };

    return merge(basicStage, stage);
}
