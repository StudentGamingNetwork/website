import { merge } from "lodash";

export type TTournament = {
    _id: string;
    name: string;
    dates: {
        final: string;
        playDays: string;
        start: string;
        subscriptionClose: Date;
    };
    description: string;
    game: {
        name: string;
        team: {
            coachNumber: number;
            maxTeams: number;
            playersNumber: number;
            subscribed: number;
            substitutesNumber: number;
        };
        username: string;
    };
    informations: {
        prizes: string;
        rulesUrl: string;
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

export function makeObject(tournament: Partial<TTournament>): TTournament {
    const basicTournament = {
        _id: "",
        name: "",
        dates: {
            start: "",
            final: "",
            playDays: "",
            subscriptionClose: ""
        },
        description: "",
        game: {
            name: "",
            team: {
                coachNumber: 0,
                playersNumber: 0,
                substitutesNumber: 0
            }
        },
        informations: {
            prizes: "",
            rulesUrl: ""
        },
        settings: {
            code: "",
            logo: "",
            slug: "",
            toornament: ""
        },
        state: {
            archived: false,
            public: false
        }
    };

    return merge(basicTournament, tournament);
}
