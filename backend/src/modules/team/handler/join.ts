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

            const invitationCode = request.body.invitationCode.trim().toUpperCase();

            const team = await TeamModel.findOne({
                $or: [{ "settings.coachInvitationCode": invitationCode },
                    { "settings.managerInvitationCode": invitationCode },
                    { "settings.invitationCode": invitationCode }],
                tournament: tournament._id
            });

            if (!team) {
                throw new httpErrors.NotFound("Aucune équipe trouvée.");
            }

            let invitationType;

            switch (invitationCode) {
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
            

            if (invitationType === EInvitationType.Player) {
                if (team.members.length >= tournament.game.team.playersNumber + tournament.game.team.substitutesNumber){
                    throw new httpErrors.Forbidden("Cette équipe est déjà complète");
                }
                team.members.push({
                    user: user._id,
                    username: ""
                });
            }
            

            else if (invitationType === EInvitationType.Coach) {
                if (team.staff.coach.user){
                    throw new httpErrors.Forbidden("Cette équipe ne peut plus accueillir de coach");
                }

                team.staff.coach.user = user._id;
                team.staff.coach.username = "";
            }

            else if (invitationType === EInvitationType.Manager) {
                if (team.staff.manager.user) {
                    throw new httpErrors.Forbidden("Cette équipe ne peut plus accueillir de manager");
                }

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
