import { EStageType, EStageGrandFinal, EStageGroupComposition, EStageMatchFormat, EStageParingMethod, EStageTieBreaker } from "./lib";
import Mongo from "@/database";

export interface IStage {
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
    tournament: string;
    type: EStageType;
}

export interface IStageDocument extends IStage, Mongo.Document {

}

const stageSchema: Mongo.Schema = new Mongo.Schema({
    name: {
        type: String
    },
    dates: {
        start: String,
        final: String,
        playDays: String,
        subscriptionClose: Date
    },
    description: String,
    game: {
        name: String,
        team: {
            coachEnabled: Boolean,
            managerEnabled: Boolean,
            maxTeams: Number,
            playersNumber: Number,
            subscribed: Number,
            substitutesNumber: Number
        },
        username: String
    },
    informations: {
        important: {
            externalLink: String,
            message: String
        },
        prizes: String,
        rulesUrl: String
    },
    settings: {
        code: String,
        logo: String,
        slug: String,
        toornament: String
    },
    state: {
        archived: Boolean,
        public: Boolean
    },
    tournament: {
        ref: "tournament",
        type: Mongo.Schema.Types.ObjectId
    }
});

export default Mongo.model<IStageDocument>("stage", stageSchema);
