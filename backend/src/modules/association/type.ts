import { Type } from "@sinclair/typebox";

export const TypeMemberAssociation = Type.Object({
    _id: Type.String(),
    name: Type.String(),
    mail: Type.String(),
    school: Type.Object({
        name: Type.String()
    }),
    tag: Type.Optional(Type.String()),
    users: Type.Object({
        members: Type.Array(Type.String()),
        moderators: Type.Array(Type.String()),
        owner: Type.String()
    })
});
