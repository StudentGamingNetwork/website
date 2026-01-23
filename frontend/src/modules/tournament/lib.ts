import { merge } from "lodash";
import { TTournament } from "./type";

export const lockingGames = ["phasmophobia"]

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
        isLAN: false,
        position: {
            latitude: 0,
            longitude: 0
        },
        settings: {
            code: "",
            logo: "",
            slug: "",
            studentOnly: true,
            toornament: ""
        },
        state: {
            archived: false,
            public: false
        }
    };

    return merge(basicTournament, tournament);
}
