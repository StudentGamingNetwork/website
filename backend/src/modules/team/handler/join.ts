import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "@/modules/user/lib";
import TeamModel from "@/modules/team/model";
import * as TournamentLib from "@/modules/tournament/lib";

const SchemaParams = Type.Object({
    slug: Type.String({ minLength: 1 })
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaRequest = Type.Object({
    invitationCode: Type.String()
});

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
        "/join/:slug",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            const tournament = await TournamentLib.getTournamentFromSlug(request.params.slug);

            const previousTeam = await TeamModel.findOne({
                "members.user": user._id,
                tournament: tournament._id
            });

            if (previousTeam) {
                throw new httpErrors.Forbidden("Vous êtes déjà dans une équipe");
            }

            const team = await TeamModel.findOne({
                $or: [{ "settings.coachInvitationCode": request.body.invitationCode.trim().toUpperCase() },
                    { "settings.invitationCode": request.body.invitationCode.trim().toUpperCase() }],
                tournament: tournament._id
            });

            if (!team) {
                throw new httpErrors.NotFound("Aucune équipe trouvée.");
            }

            const invitationJoueur = team.settings.invitationCode === request.body.invitationCode.trim().toUpperCase();

            if (invitationJoueur && team.members.length >= tournament.game.team.playersNumber + tournament.game.team.substitutesNumber) {
                throw new httpErrors.NotFound("Cette équipe est déjà complète");
            }

            if (!invitationJoueur && team.staff.filter((staff) => staff.role === "Coach").length >= tournament.game.team.coachNumber) {
                throw new httpErrors.NotFound("Cette équipe ne peut plus accueillir de coach");
            }
            
            if (invitationJoueur){
                team.members.push({
                    user: user._id,
                    username: ""
                });
            }

            if (!invitationJoueur) {
                team.staff.push({
                    role: "Coach",
                    user: user._id,
                    username: ""
                });
            }
            
            await team.save();

            reply.send({
                message: "Vous avez bien rejoins cette équipe.",
                success: true
            });
        }
    );
}
