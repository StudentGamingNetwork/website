import { merge } from "lodash";
import { EStageType, EStageGrandFinal, EStageGroupComposition, EStageMatchFormat, EStageParingMethod, EStageTieBreaker } from "./lib";
import { TTournament } from "@/modules/tournament";

export type TStage = {
    _id: string,
    name: string;
    advanced: {
        gameResult?: {
            draw: number;
            loss: number;
            win: number;
        };
        groupComposition?: EStageGroupComposition;
        matchForfeit?: number;
        matchResult?: {
            draw: number;
            loss: number;
            win: number;
        };
        matchScore?: {
            draw: number;
            loss: number;
            win: number;
        };
        pairingMethod?: EStageParingMethod;
        qualifiedThreshold: number;
        tieBreaker?: Array<EStageTieBreaker>;
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
            qualifiedThreshold: 0
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
