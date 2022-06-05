import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import DonationModel from "@/modules/overlay/models/donation";

const SchemaResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const SchemaBody = Type.Object({
    amount: Type.Number(),
    author: Type.String(),
    message: Type.String()
});

const SchemaQueryString = Type.Object({
    key: Type.String()
});

type TSchemaBody = Static<typeof SchemaBody>;
type TSchemaQueryString = Static<typeof SchemaQueryString>;

const schema = {
    body: SchemaBody,
    querystring: SchemaQueryString,
    response: {
        200: SchemaResponse
    }
};

const overlayApiKey = process.env.OVERLAY_API as string;

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TSchemaBody; Querystring: TSchemaQueryString; Response: TSchemaResponse }>(
        "/donation/hook",
        { schema },
        async (request, reply) => {
            if (request.query.key !== overlayApiKey) {
                throw new httpErrors.Forbidden("La clé API n'est pas valide.");
            }

            await DonationModel.create({
                amount: request.body.amount,
                author: request.body.author,
                date: new Date(),
                message: request.body.message
            });

            reply.send({
                message: "La donation a bien été enregistrée",
                success: true
            });
        }
    );
}
