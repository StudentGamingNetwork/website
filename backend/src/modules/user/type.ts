import { Type } from "@sinclair/typebox";
import { TypeBasicAssociation, TypeMemberAssociation } from "@/modules/association/type";

const BasicUser = {
    _id: Type.String(),
    association: Type.Optional(Type.String()),
    avatar: Type.Optional(Type.String()),
    roles: Type.Array(Type.String()),
    student: Type.Optional(Type.Object({
        schoolName: Type.Optional(Type.String())
    })),
    username: Type.String()
};

const BasicAssociationFields = {
    association: Type.Optional(TypeBasicAssociation)
};

const AssociationFields = {
    association: Type.Optional(TypeMemberAssociation)
};

const OwnerFields = {
    mail: Type.String(),
    platforms: Type.Object({
        discord: Type.String(),
        google: Type.String()
    }),
    student: Type.Optional(Type.Object({
        name: Type.Optional(Type.String()),
        certificate: Type.Optional(Type.String()),
        rejectReason: Type.Optional(Type.String()),
        schoolName: Type.Optional(Type.String()),
        status: Type.Optional(Type.String())
    })),
    twoFactorAuth: Type.Optional(Type.Object({
        enabled: Type.Boolean()
    })
    )
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
