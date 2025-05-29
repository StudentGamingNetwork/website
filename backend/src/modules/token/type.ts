import { Type } from "@sinclair/typebox";

const Token = {
    _id: Type.String(),
    expirationDate: Type.Date(),
    token: Type.String(),
    used: Type.Boolean()
};

export const TypeToken = Type.Object(Token);
