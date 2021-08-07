import { Type } from "@sinclair/typebox";
import { TypeBasicAssociation, TypeMemberAssociation } from "@/modules/association/type";

const BasicUser = {
    _id: Type.String(),
    name: Type.Optional(Type.String()),
    association: Type.Optional(TypeBasicAssociation),
    avatar: Type.Optional(Type.String()),
    roles: Type.Array(Type.String()),
    username: Type.String()
};

const OwnerFields = {
    association: Type.Optional(TypeMemberAssociation),
    mail: Type.String()
};

const AdminFields = {
    subscriptionDate: Type.String()
};

export const TypeBasicUser = Type.Object(BasicUser);
export const TypeOwnerUser = Type.Object({
    ...BasicUser,
    ...OwnerFields
});
export const TypeAdminUser = Type.Object({
    ...BasicUser,
    ...OwnerFields,
    ...AdminFields
});
