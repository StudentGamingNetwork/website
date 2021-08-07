import { Type } from "@sinclair/typebox";
import { TypeMemberAssociationLite } from "@/modules/association/type";

const BasicUser = {
    _id: Type.String(),
    name: Type.Optional(Type.String()),
    association: Type.Optional(TypeMemberAssociationLite),
    avatar: Type.Optional(Type.String()),
    roles: Type.Array(Type.String()),
    username: Type.String()
};

const OwnerFields = {
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
