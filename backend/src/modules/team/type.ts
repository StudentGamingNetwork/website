import { Type } from "@sinclair/typebox";

const Team = {
    _id: Type.String(),
    settings: Type.Object({
        name: Type.String(),
        tag: Type.String()
    }),
    state: Type.Object({
        ready: Type.Boolean(),
        validated: Type.Boolean()
    }),
    tournament: Type.String(),
    users: Type.Object({
        members: Type.Array(Type.String()),
        owner: Type.String()
    })
};

export const TypeTeam = Type.Object(Team);
