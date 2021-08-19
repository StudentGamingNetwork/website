import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as TournamentLib from "../lib";
import { TypeTournament } from "@/modules/tournament/type";

const SchemaParams = Type.Object({
    slug: Type.String({ minLength: 1 })
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaResponse = Type.Partial(TypeTournament);

type TSchemaResponse = Static<typeof SchemaResponse>;


const schema = {
    params: SchemaParams,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Params: TSchemaParams; Response: TSchemaResponse }>(
        "/get/:slug",
        { schema },
        async (request, reply) => {
            const slug = request.params.slug;
            const tournament = await TournamentLib.getTournamentFromSlug(slug);

            reply.send(tournament);
        }
    );
}
