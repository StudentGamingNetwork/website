import { EStageGrandFinal, EStageGroupComposition, EStageMatchCalculation, EStageMatchFormat, EStageParingMethod, EStageTieBreaker, EStageType } from "./enum";
import Mongo from "@/database";


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
        scoreBasedCalculations: EStageMatchCalculation;
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
            activated: {
                type: Boolean
            },
            points: {
                type: Number
            }
        },
        pairingMethod: {
            default: EStageParingMethod.BALANCED,
            enum: Object.values(EStageParingMethod),
            type: String
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
        roundScore: {
            type: Boolean
        },
        tieBreaker: {
            type: Array<EStageTieBreaker>
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
            default: EStageMatchCalculation.NONE,
            enum: Object.values(EStageMatchCalculation),
            type: String
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
    tournament: {
        ref: "tournament",
        type: Mongo.Schema.Types.ObjectId
    },
    type: {
        default: EStageType.DUEL_BRACKET_GROUPS,
        enum: Object.values(EStageType),
        type: String
    }
});

export default Mongo.model<IStageDocument>("stage", stageSchema);
