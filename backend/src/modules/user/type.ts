import { Type } from "@sinclair/typebox";
import { TypeBasicAssociation, TypeMemberAssociation } from "@/modules/association/type";

const BasicUser = {
    _id: Type.String(),
    name: Type.Optional(Type.String()),
    association: Type.Optional(Type.String()),
    avatar: Type.Optional(Type.String()),
    roles: Type.Array(Type.String()),
    username: Type.String()
};

const BasicAssociationFields = {
    association: Type.Optional(TypeBasicAssociation)
};

const AssociationFields = {
    association: Type.Optional(TypeMemberAssociation)
};

const OwnerFields = {
    mail: Type.String()
};

const AdminFields = {
    subscriptionDate: Type.String()
};

export const TypeBasicUser = Type.Object(BasicUser);

export const TypeUser = Type.Object({
    ...BasicUser,
    ...BasicAssociationFields
});


export const TypeOwnerUser = Type.Object({
    ...BasicUser,
    ...AssociationFields,
    ...OwnerFields
});


export const TypeAdminBasicUser = Type.Object({
    ...BasicUser,
    ...OwnerFields,
    ...AdminFields
});

export const TypeAdminUser = Type.Object({
    ...BasicUser,
    ...OwnerFields,
    ...AssociationFields,
    ...AdminFields
});
