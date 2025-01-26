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
            isEnabled: boolean;
            points: number;
        };
        matchResult: {
            draw: number;
            isEnabled: boolean;
            loss: number;
            win: number;
        };
        matchScore: boolean;
        noOpponents: {
            isEnabled: boolean;
            points: number;
        };
        pairingMethod: EStageParingMethod;
        qualifiedThreshold?: number;
        roundResult: {
            draw: number;
            isEnabled: boolean;
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
            enabled: {
                type: Boolean
            },
            points: {
                type: Number
            }
        },
        matchResult: {
            draw: {
                type: Number
            },
            isEnabled: {
                type: Boolean
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
        isEnabled: {
            type: Boolean
        },
        points: {
            type: Number
        }
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
        draw: {
            type: Number
        },
        isEnabled: {
            type: Boolean
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
