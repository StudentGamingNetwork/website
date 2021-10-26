import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import startOfDay from "date-fns/startOfDay";
import * as UserLib from "@/modules/user/lib";
import TeamModel from "@/modules/team/model";
import * as TournamentLib from "@/modules/tournament/lib";
import * as TeamLib from "@/modules/team/lib";

const SchemaParams = Type.Object({
    slug: Type.String({ minLength: 1 })
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaResponse = Type.Object({
    id: Type.String(),
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    params: SchemaParams,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Params: TSchemaParams; Response: TSchemaResponse }>(
        "/create/:slug",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            const tournament = await TournamentLib.getTournamentFromSlug(request.params.slug);

            if (!tournament.state.public) {
                throw new httpErrors.Forbidden("Ce tournoi n'est pas encore publique.");
            }

            if (!tournament.dates.subscriptionClose || tournament.dates.subscriptionClose < startOfDay(new Date())) {
                throw new httpErrors.Forbidden("Les inscriptions pour ce tournoi sont fermées.");
            }

            const existingTeam = await TeamModel.findOne({
                "members.user": user._id,
                tournament: tournament._id
            });

            if (existingTeam) {
                throw new httpErrors.Forbidden("Vous faites déjà partie d'une équipe pour ce tournoi.");
            }

            const team = await TeamModel.create({
                members: [
                    {
                        user: user._id,
                        username: ""
                    }
                ],
                owner: user._id,
                settings: {
                    invitationCode: TeamLib.generateInvitationCode()
                },
                state: {
                    ready: false,
                    validated: false
                },
                tournament: tournament._id
            });

            reply.send({
                id: team._id,
                message: "L'équipe a correctement été créée.",
                success: true
            });
        }
    );
}
