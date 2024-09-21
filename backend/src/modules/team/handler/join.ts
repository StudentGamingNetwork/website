import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import { EInvitationType } from "@/modules/team/lib";
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
                $or: [{ "members.user": user._id }, { "staff.coach.user": user._id }, { "staff.manager.user": user._id }],
                tournament: tournament._id
            });

            if (previousTeam) {
                throw new httpErrors.Forbidden("Vous êtes déjà dans une équipe");
            }

            const team = await TeamModel.findOne({
                $or: [{ "settings.coachInvitationCode": request.body.invitationCode.trim().toUpperCase() },
                    { "settings.managerInvitationCode": request.body.invitationCode.trim().toUpperCase() },
                    { "settings.invitationCode": request.body.invitationCode.trim().toUpperCase() }],
                tournament: tournament._id
            });

            if (!team) {
                throw new httpErrors.NotFound("Aucune équipe trouvée.");
            }

            let invitationType;

            switch (request.body.invitationCode.trim().toUpperCase()) {
            case team.settings.invitationCode:
                invitationType = EInvitationType.Player;
                break;
            case team.settings.coachInvitationCode:
                invitationType = EInvitationType.Coach;
                break;
            case team.settings.managerInvitationCode:
                invitationType = EInvitationType.Manager;
                break;           
            }
            

            if (invitationType === EInvitationType.Player && team.members.length >= tournament.game.team.playersNumber + tournament.game.team.substitutesNumber) {
                throw new httpErrors.NotFound("Cette équipe est déjà complète");
            }

            else if (team.staff.coach.user !== undefined) {
                throw new httpErrors.NotFound("Cette équipe ne peut plus accueillir de coach");
            }

            else if (team.staff.manager.user !== undefined) {
                throw new httpErrors.NotFound("Cette équipe ne peut plus accueillir de manager");
            }
            
            if (invitationType === EInvitationType.Player) {
                team.members.push({
                    user: user._id,
                    username: ""
                });
            }

            else if (invitationType === EInvitationType.Coach) {
                team.staff.coach.user = user._id;
                team.staff.coach.username = "";
            }

            else if (invitationType === EInvitationType.Manager) {
                team.staff.manager.user = user._id;
                team.staff.manager.username = "";
            }
            
            await team.save();

            reply.send({
                message: "Vous avez bien rejoins cette équipe.",
                success: true
            });
        }
    );
}
