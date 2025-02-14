import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { TypeStage } from "@/modules/stage/type";
import StageModel from "@/modules/stage/model";
import * as TournamentLib from "@/modules/tournament/lib";

const SchemaParams = Type.Object({
    slug: Type.String({ minLength: 1 })
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaResponse = Type.Partial(Type.Array(TypeStage));

type TSchemaResponse = Static<typeof SchemaResponse>;


const schema = {
    params: SchemaParams,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Params: TSchemaParams; Response: TSchemaResponse }>(
        "/list/:slug",
        { schema },
        async (request, reply) => {
            const tournament = await TournamentLib.getTournamentFromSlug(request.params.slug);

            const stages = await StageModel.find({
                tournament: tournament._id
            }).sort({ number: 1 }).exec();

            if (!stages) {
                reply.send([]);
                return;
            }

            reply.send(stages);
        }
    );
}
