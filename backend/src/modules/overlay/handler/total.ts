import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import DonationModel from "@/modules/overlay/models/donation";

const SchemaResponse = Type.String();

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Params: null; Response: TSchemaResponse }>(
        "/donation/total",
        { schema },
        async (_request, reply) => {
            const total = (await DonationModel.aggregate([{
                $group: { _id: 0, total: { $sum: "$amount" } }
            }]))[0].total as number;

            reply.send(`${ total.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) } €`);
        }
    );
}
