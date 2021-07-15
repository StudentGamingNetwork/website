import Mongo from "@/database";

export interface ITournament {
    title: string;
    gameId: Mongo.Schema.Types.ObjectId;
    public: boolean;
    archived: boolean;
    description: string;
    dates: {
        final: string;
        playDays: string;
        start: string;
        subscriptionClose: Date;
    };
    informations: {
        prizes: string;
        registeredTeams: number;
        rulesUrl: string;
        team: {
            playersNumber: number;
            substitutesNumber: number;
        };
    };
}

export interface ITournamentDocument extends ITournament, Mongo.Document {

}

const tournamentSchema: Mongo.Schema = new Mongo.Schema({
    title: {
        faker: "company.companyName",
        required: true,
        type: String
    },
    archived: Boolean,
    dates: {
        start: String,
        final: String,
        playDays: String,
        subscriptionClose: Date
    },
    description: String,
    gameId: {
        ref: "game",
        required: true,
        type: Mongo.Schema.Types.ObjectId
    },
    informations: {
        prizes: String,
        registeredTeams: Number,
        rulesUrl: String,
        team: {
            playersNumber: Number,
            substitutesNumber: Number
        }
    },
    public: Boolean
});

export default Mongo.model<ITournamentDocument>("tournament", tournamentSchema);
