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
                coachEnabled: false,
                managerEnabled: false,
                playersNumber: 0,
                substitutesNumber: 0
            }
        },
        informations: {
            important: {
                externalLink: "",
                message: ""
            },
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
