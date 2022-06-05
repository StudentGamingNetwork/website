import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import DonationModel from "@/modules/overlay/models/donation";
import { TypeDonation } from "@/modules/overlay/types/donation";

const SchemaResponse = Type.Array(TypeDonation);

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
                date: -1
            });

            reply.send(donations);
        }
    );
}
