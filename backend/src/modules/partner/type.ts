import { Type } from "@sinclair/typebox";

const Partner = {
    _id: Type.String(),
    name: Type.String(),
    description: Type.String(),
    logo: Type.Optional(Type.String()),
    networks: Type.Optional(Type.Object({
        facebook: Type.Optional(Type.String()),
        twitter: Type.Optional(Type.String()),
        website: Type.Optional(Type.String())
    })),
    public: Type.Boolean()
};

export const TypePartner = Type.Object(Partner);
