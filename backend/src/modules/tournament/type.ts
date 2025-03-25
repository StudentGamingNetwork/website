import { Type } from "@sinclair/typebox";

const Tournament = {
    _id: Type.String(),
    name: Type.String(),
    dates: Type.Object({
        start: Type.String(),
        final: Type.String(),
        playDays: Type.String(),
        subscriptionClose: Type.Optional(Type.String())
    }),
    description: Type.String(),
    game: Type.Object({
        name: Type.Optional(Type.String()),
        team: Type.Object({
            coachEnabled: Type.Optional(Type.Boolean()),
            managerEnabled: Type.Optional(Type.Boolean()),
            maxTeams: Type.Optional(Type.Number()),
            playersNumber: Type.Optional(Type.Number()),
            subscribed: Type.Number(),
            substitutesNumber: Type.Optional(Type.Number())
        }),
        username: Type.Optional(Type.String())
    }),
    informations: Type.Object({
        important: Type.Optional(Type.Object({
            externalLink: Type.String(),
            message: Type.String()
        })),
        prizes: Type.String(),
        rulesUrl: Type.String()
    }),
    isLAN: Type.Optional(Type.Boolean()),
    position: Type.Optional(Type.Object({
        latitude: Type.Number({ maximum: 90, minimum: -90 }),
        longitude: Type.Number({ maximum: 180, minimum: -180 })
    })),
    settings: Type.Optional(Type.Object({
        code: Type.Optional(Type.String()),
        logo: Type.Optional(Type.String()),
        slug: Type.Optional(Type.String()),
        toornament: Type.Optional(Type.String())
    })),
    state: Type.Optional(Type.Object({
        archived: Type.Optional(Type.Boolean()),
        public: Type.Optional(Type.Boolean())
    }))
};

export const TypeTournament = Type.Object(Tournament);
