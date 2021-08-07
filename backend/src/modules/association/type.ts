import { Type } from "@sinclair/typebox";

const BasicAssociation = {
    _id: Type.String(),
    name: Type.String(),
    mail: Type.String(),
    school: Type.Object({
        name: Type.String()
    }),
    tag: Type.Optional(Type.String())
};

const Users = {
    users: Type.Object({
        members: Type.Array(Type.String()),
        moderators: Type.Array(Type.String()),
        owner: Type.String()
    })
};

export const TypeMemberAssociationLite = Type.Object(BasicAssociation);

export const TypeMemberAssociation = Type.Object({
    ...BasicAssociation,
    ...Users
});
