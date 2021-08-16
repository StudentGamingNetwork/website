import { Type } from "@sinclair/typebox";

const Tournament = {
    _id: Type.String(),
    name: Type.String(),
    dates: Type.Object({
        start: Type.String(),
        final: Type.String(),
        playDays: Type.String(),
        subscriptionClose: Type.String()
    }),
    description: Type.String(),
    game: Type.Object({
        name: Type.String(),
        team: Type.Object({
            playersNumber: Type.Number(),
            substitutesNumber: Type.Number()
        })
    }),
    informations: Type.Object({
        prize: Type.String(),
        rulesUrl: Type.String()
    }),
    settings: Type.Optional(Type.Object({
        logo: Type.String(),
        slug: Type.String()
    })),
    state: Type.Optional(Type.Object({
        archived: Type.Boolean(),
        public: Type.Boolean()
    }))
};

export const TypeTournament = Type.Object(Tournament);
