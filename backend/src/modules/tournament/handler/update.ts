import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import { isUndefined } from "lodash";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";
import TournamentModel from "@/modules/tournament/model";
import { TypeTournament } from "@/modules/tournament/type";

const SchemaParams = Type.Object({
    id: Type.String({ minLength: 1 })
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaRequest = Type.Partial(TypeTournament);

type TSchemaRequest = Static<typeof SchemaRequest>;

const SchemaResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    body: SchemaRequest,
    params: SchemaParams,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TSchemaRequest; Params: TSchemaParams; Response: TSchemaResponse }>(
        "/update/:id",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament]);

            const tournament = await TournamentModel.findById(request.params.id);

            if (!tournament) {
                throw new httpErrors.NotFound("Aucun tournoi trouvé.");
            }

            if (!isUndefined(request.body.name)) {
                tournament.name = request.body.name;
                tournament.settings.slug = request.body.settings?.slug || "";
                tournament.informations.prizes = request.body.informations?.prizes || "";
                tournament.informations.rulesUrl = request.body.informations?.rulesUrl || "";
                tournament.game.name = request.body.game?.name || "";
                tournament.game.username = request.body.game?.username || "";
                tournament.game.team.playersNumber = request.body.game?.team.playersNumber || 0;
                tournament.game.team.substitutesNumber = request.body.game?.team.substitutesNumber || 0;
                tournament.game.team.maxTeams = request.body.game?.team.maxTeams || 0;
                tournament.dates.subscriptionClose = request.body.dates?.subscriptionClose ? new Date(request.body.dates.subscriptionClose) : undefined;
                tournament.dates.start = request.body.dates?.start || "";
                tournament.dates.playDays = request.body.dates?.playDays || "";
                tournament.dates.final = request.body.dates?.final || "";
            }

            if (!isUndefined(request.body.state?.public)) {
                tournament.state.public = request.body.state?.public || false;
            }

            if (!isUndefined(request.body.state?.archived)) {
                tournament.state.archived = request.body.state?.archived || false;
            }

            await tournament.save();

            reply.send({
                message: "Le tournoi a correctement été mis à jour.",
                success: true
            });
        }
    );
}
