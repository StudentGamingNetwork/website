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
    data: Type.Object({
        items: Type.Array(
            Type.Object({
                amount: Type.Number(),
                customFields: Type.Array(
                    Type.Object({
                        answer: Type.String()
                    })
                )
            })
        )
    }),
    eventType: Type.String()
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

            if (request.body.eventType !== "Order") {
                reply.send({
                    message: "Ce n'est pas une donation",
                    success: true
                });
                return;
            }

            const amount = request.body.data.items[0].amount;
            const author = request.body.data.items[0].customFields[0].answer || "Anonyme";
            const message = request.body.data.items[0].customFields[1].answer;

            await DonationModel.create({
                amount: amount,
                author: author,
                date: new Date(),
                message: message
            });

            reply.send({
                message: "La donation a bien été enregistrée",
                success: true
            });
        }
    );
}
