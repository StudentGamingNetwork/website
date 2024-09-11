import { Type } from "@sinclair/typebox";

const Team = {
    _id: Type.String(),
    members: Type.Array(Type.Object({
        user: Type.String(),
        username: Type.String()
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
    staff: Type.Object({
        coach: Type.Optional(Type.Object({
            user: Type.String(),
            username: Type.String()
        })),
        manager: Type.Optional(Type.Object({
            user: Type.String(),
            username: Type.String()
        }))
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
    association: Type.Optional(Type.Object(TeamAssociation)),
    avatar: Type.Optional(Type.String()),
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
    association: Type.Optional(Type.Object(TeamAssociation)),
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
        username: Type.String()
    })),
    staff: Type.Object({
        coach: Type.Optional(Type.Object({
            kick: Type.Optional(Type.Boolean()),
            user: Type.Object(TeamUser),
            username: Type.String()
        })),
        manager: Type.Optional(Type.Object({
            kick: Type.Optional(Type.Boolean()),
            user: Type.Object(TeamUser),
            username: Type.String()
        }))
    })
});

export const TypeCompleteTeamAdmin = Type.Object({
    ...Team,
    members: Type.Array(Type.Object({
        kick: Type.Optional(Type.Boolean()),
        user: Type.Object(TeamUserAdmin),
        username: Type.String()
    })),
    staff: Type.Object({
        coach: Type.Optional(Type.Object({
            kick: Type.Optional(Type.Boolean()),
            user: Type.Object(TeamUser),
            username: Type.String()
        })),
        manager: Type.Optional(Type.Object({
            kick: Type.Optional(Type.Boolean()),
            user: Type.Object(TeamUser),
            username: Type.String()
        }))
    })
});
