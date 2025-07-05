import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import { isUndefined } from "lodash-es";
import * as UserLib from "@/modules/user/lib";
import TeamModel from "@/modules/team/model";
import { ERoles } from "@/modules/user/model";
import TournamentModel from "@/modules/tournament/model";

const SchemaRequest = Type.Object({
    _id: Type.String(),
    validated: Type.Optional(Type.Boolean())
});

type TSchemaRequest = Static<typeof SchemaRequest>;

const SchemaResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    body: SchemaRequest,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TSchemaRequest; Response: TSchemaResponse }>(
        "/manage",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament]);

            const team = await TeamModel.findOne({
                _id: request.body._id
            });

            if (!team) {
                throw new httpErrors.NotFound("Aucune équipe trouvée.");
            }

            const tournament = await TournamentModel.findById(team.tournament);

            if (!tournament) {
                throw new httpErrors.NotFound("Aucun tournoi trouvée.");
            }

            if (!isUndefined(request.body.validated)) {
                if (team.state.validated !== request.body.validated) {
                    if (request.body.validated) {
                        tournament.game.team.subscribed++;
                    }
                    else {
                        tournament.game.team.subscribed--;
                    }
                }

                team.state.validated = request.body.validated;
            }

            await team.save();
            await tournament.save();

            reply.send({
                message: "L'équipe a correctement été mise à jour.",
                success: true
            });
        }
    );
}
