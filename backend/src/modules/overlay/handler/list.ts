import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import DonationModel from "@/modules/overlay/models/donation";
import { TypeDonation } from "@/modules/overlay/types/donation";

const SchemaResponse = Type.Object({
    donations: Type.Array(TypeDonation),
    total: Type.Number()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Params: null; Response: TSchemaResponse }>(
        "/donation/list",
        { schema },
        async (_request, reply) => {
            const fiveMinutesAgo = new Date(new Date().getTime() - 5 * 60 * 1000);


            const donations = await DonationModel.find({
                date: { $gte: fiveMinutesAgo }
            }).sort({
                date: 1
            });

            const total = (await DonationModel.aggregate([{
                $group: { _id: 0, total: { $sum: "$amount" } }
            }]))[0].total;

            reply.send({ donations, total });
        }
    );
}
