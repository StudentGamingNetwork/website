import { EStageType, EStageGroupComposition, EStageParingMethod, EStageTieBreaker } from "./lib";
import Mongo from "@/database";


export enum EStageGrandFinal {
    NONE = "None",
    SIMPLE = "Simple",
    DOUBLE = "Double"
}


export enum EStageMatchFormat {
    NONE = "None",
    BEST_OF = "Best_of",
    SINGLE = "Single",
    HOMEGUEST = "Home/guest",
    FIXED = "Fixed"
}

export interface IStage {
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
        roundScore: boolean;
        tieBreaker: Array<EStageTieBreaker>;
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
    number: number;
    placement: boolean;
    tournament: string;
    type: EStageType;
}

export interface IStageDocument extends IStage, Mongo.Document {

}

const stageSchema: Mongo.Schema = new Mongo.Schema({
    name: {
        type: String
    },
    advanced: {
        groupComposition: {
            type: String
        },
        matchForfeit: {
            activated: {
                type: Boolean
            },
            points: {
                type: Number
            }
        },
        matchResult: {
            activated: {
                type: Boolean
            },
            draw: {
                type: Number
            },
            loss: {
                type: Number
            },
            win: {
                type: Number
            }
        },
        matchScore: {
            type: Boolean
        },
        noOpponents: {
            enabled: {
                type: Boolean
            },
            points: {
                type: Number
            }
        },
        roundScore: {
            type: Boolean
        }
    },
    general: {
        grandFinal: {
            default: EStageGrandFinal.NONE,
            enum: Object.values(EStageGrandFinal),
            type: String
        },
        groupNumber: {
            type: Number
        },
        loserBracket: {
            type: Boolean
        },
        size: {
            type: Number
        },
        skipFirstRound: {
            type: Boolean
        },
        thirdPlace: {
            type: Boolean
        }
    },
    matchSettings: {
        endWhenWinnerKnown: {
            type: Boolean
        },
        format: {
            default: EStageMatchFormat.NONE,
            enum: Object.values(EStageMatchFormat),
            type: String
        },
        gamesNumber: {
            type: Number
        },
        scoreBasedCalculations: {
            type: Boolean
        }
    },
    noOpponents: {
        activated: {
            type: Boolean
        },
        points: {
            type: Number
        }
    },
    number: {
        type: Number
    },
    pairingMethod: {
        type: String
    },
    placement: {
        type: Boolean
    },
    qualifiedThreshold: {
        type: Number
    },
    roundResult: {
        activated: {
            type: Boolean
        },
        draw: {
            type: Number
        },
        loss: {
            type: Number
        },
        win: {
            type: Number
        }
    },
    tieBreaker: {
        type: Array
    },
    tournament: {
        ref: "tournament",
        type: Mongo.Schema.Types.ObjectId
    }
});

export default Mongo.model<IStageDocument>("stage", stageSchema);
