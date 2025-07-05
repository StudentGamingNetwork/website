import Mongo from "@/database";

export interface ITournament {
    name: string;
    dates: {
        final: string;
        playDays: string;
        start: string;
        subscriptionClose?: Date;
    };
    description: string;
    game: {
        name: string;
        team: {
            coachEnabled: boolean;
            managerEnabled: boolean;
            maxTeams: number;
            playersNumber: number;
            subscribed: number;
            substitutesNumber: number;
        };
        username: string;
    };
    informations: {
        important: {
            externalLink: string;
            message: string;
        };
        prizes: string;
        rulesUrl: string;
    };
    isLAN?: boolean;
    position?: {
        latitude: number;
        longitude: number;
    };
    settings: {
        code: string;
        logo: string;
        slug: string;
        toornament: string;
    };
    state: {
        archived: boolean;
        public: boolean;
    };
}

export interface ITournamentDocument extends ITournament, Mongo.Document {

}

const tournamentSchema: Mongo.Schema = new Mongo.Schema({
    name: {
        faker: "company.company.name",
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
    isLAN: Boolean,
    position: {
        latitude: Number,
        longitude: Number
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
    }
});

export default Mongo.models.tournament || Mongo.model<ITournamentDocument>("tournament", tournamentSchema);
