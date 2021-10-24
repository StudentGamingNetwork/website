import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as TournamentLib from "../lib";
import { TypeTournament } from "@/modules/tournament/type";
//import * as UserLib from "@/modules/user/lib";
//import { ERoles } from "@/modules/user/model";

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

            /* Désactivé temporairement pour les widget
            if (!tournament.state.public) {
                const user = await UserLib.getUser(request);
                UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament]);
            }
            */

            reply.send(tournament);
        }
    );
}
