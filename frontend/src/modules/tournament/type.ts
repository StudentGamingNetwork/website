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
    isLAN: boolean;
    position: {
        latitude: number;
        longitude: number;
    };
    settings: {
        code: string;
        logo: string;
        slug: string;
        studentOnly: boolean;
        toornament: string;
    };
    state: {
        archived: boolean;
        public: boolean;
    };
}
