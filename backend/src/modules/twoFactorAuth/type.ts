import { Type } from "@sinclair/typebox";

export const Token = Type.Object({
    _id: Type.String(),
    method: Type.Object({
        secret: Type.Optional(Type.String()),
        type: Type.String()
    }),
    userId: Type.String()
});
