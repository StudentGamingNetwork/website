import { Type } from "@sinclair/typebox";

const Donation = {
    _id: Type.String(),
    amount: Type.Number(),
    author: Type.String(),
    date: Type.String(),
    message: Type.String()
};

export const TypeDonation = Type.Object(Donation);
