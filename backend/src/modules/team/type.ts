import { Type } from "@sinclair/typebox";

const Team = {
    _id: Type.String(),
    members: Type.Array(Type.Object({
        user: Type.String(),
        username: Type.String(),
        acceptedRules: Type.Boolean({ default: false }),
        phasmophobia: Type.Optional(Type.Object({
            rank: Type.String(),
            level: Type.Number(),
        }))
    })),
    owner: Type.String(),
    settings: Type.Object({
        name: Type.Optional(Type.String()),
        coachInvitationCode: Type.Optional(Type.String()),
        invitationCode: Type.Optional(Type.String()),
        logo: Type.Optional(Type.String()),
        managerInvitationCode: Type.Optional(Type.String()),
        tag: Type.Optional(Type.String())
    }),
    game: Type.Optional(Type.Object({
        phasmophobia: Type.Optional(Type.Object({
            map1: Type.Optional(Type.String()),
            map2: Type.Optional(Type.String()),
            map3: Type.Optional(Type.String())
        }))
    })),
    staff: Type.Object({
        coach: Type.Object({
            user: Type.Optional(Type.String()),
            username: Type.Optional(Type.String())
        }),
        manager: Type.Object({
            user: Type.Optional(Type.String()),
            username: Type.Optional(Type.String())
        })
    }),
    state: Type.Object({
        ready: Type.Boolean(),
        validated: Type.Boolean()
    }),
    tournament: Type.String()
};

const TeamAssociation = {
    _id: Type.String(),
    name: Type.String(),
    logo: Type.Optional(Type.String()),
    school: Type.Object({
        name: Type.String()
    }),
    settings: Type.Optional(Type.Object({
        slug: Type.Optional(Type.String())
    })),
    tag: Type.Optional(Type.String())
};

const TeamUser = {
    _id: Type.String(),
    association: Type.Optional(Type.Union([
        Type.Object(TeamAssociation),
        Type.Null(),
        Type.Object({})
    ])),
    avatar: Type.Optional(Type.String()),
    birthdate: Type.Optional(Type.String()),
    mail: Type.String(),
    platforms: Type.Object({
        discord: Type.String()
    }),
    student: Type.Optional(Type.Object({
        name: Type.Optional(Type.String()),
        schoolName: Type.Optional(Type.String()),
        status: Type.Optional(Type.String())
    })),
    username: Type.String()
};

const TeamUserAdmin = {
    _id: Type.String(),
    association: Type.Optional(Type.Union([
        Type.Object(TeamAssociation),
        Type.Null(),
        Type.Object({})
    ])),
    avatar: Type.Optional(Type.String()),
    mail: Type.String(),
    platforms: Type.Object({
        discord: Type.String()
    }),
    student: Type.Optional(Type.Object({
        name: Type.Optional(Type.String()),
        certificate: Type.Optional(Type.String()),
        schoolName: Type.Optional(Type.String()),
        status: Type.Optional(Type.String())
    })),
    username: Type.String()
};

export const TypeTeam = Type.Object(Team);

export const TypeCompleteTeam = Type.Object({
    ...Team,
    members: Type.Array(Type.Object({
        kick: Type.Optional(Type.Boolean()),
        user: Type.Object(TeamUser),
        username: Type.String(),
        acceptedRules: Type.Boolean({ default: false }),
        phasmophobia: Type.Optional(Type.Object({
            rank: Type.String(),
            level: Type.Number(),
        }))
    })),
    staff: Type.Object({
        coach: Type.Object({
            kick: Type.Optional(Type.Boolean()),
            user: Type.Optional(Type.Object(TeamUser)),
            username: Type.Optional(Type.String())
        }),
        manager: Type.Object({
            kick: Type.Optional(Type.Boolean()),
            user: Type.Optional(Type.Object(TeamUser)),
            username: Type.Optional(Type.String())
        })
    })
});

export const TypeCompleteTeamAdmin = Type.Object({
    ...Team,
    members: Type.Array(Type.Object({
        kick: Type.Optional(Type.Boolean()),
        user: Type.Object(TeamUserAdmin),
        username: Type.String(),
        acceptedRules: Type.Boolean({ default: false }),
        phasmophobia: Type.Optional(Type.Object({
            rank: Type.String(),
            level: Type.Number(),
        }))
    })),
    staff: Type.Object({
        coach: Type.Object({
            kick: Type.Optional(Type.Boolean()),
            user: Type.Optional(Type.Object(TeamUser)),
            username: Type.Optional(Type.String())
        }),
        manager: Type.Object({
            kick: Type.Optional(Type.Boolean()),
            user: Type.Optional(Type.Object(TeamUser)),
            username: Type.Optional(Type.String())
        })
    })
});
