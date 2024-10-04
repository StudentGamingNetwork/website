import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import startOfDay from "date-fns/startOfDay";
import * as UserLib from "@/modules/user/lib";
import { TypeCompleteTeam } from "@/modules/team/type";
import TeamModel from "@/modules/team/model";
import TournamentModel from "@/modules/tournament/model";

const SchemaRequest = TypeCompleteTeam;

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
        "/update",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);

            const team = await TeamModel.findOne({
                _id: request.body._id,
                $or: [{ "members.user": user._id }, { "staff.coach.user": user._id }, { "staff.manager.user": user._id }]
            });

            if (!team) {
                throw new httpErrors.NotFound("Aucune équipe trouvée.");
            }

            const tournament = await TournamentModel.findById(team.tournament);

            if (!tournament) {
                throw new httpErrors.NotFound("Aucun tournoi trouvé.");
            }

            if (tournament.dates.subscriptionClose && tournament.dates.subscriptionClose < startOfDay(new Date())) {
                throw new httpErrors.Forbidden("Vous ne pouvez pas modifier votre équipe une fois que le tournoi a commencé.");
            }

            if (team.owner.toString() === user._id.toString()){
                team.settings.name = request.body.settings.name || "";
                team.settings.tag = request.body.settings.tag || "";

                for (const teamMember of request.body.members) {
                    if (teamMember.kick && teamMember.user._id !== team.owner.toString()) {
                        team.members = team.members.filter((member) => member.user.toString() !== teamMember.user._id);
                    }
                }
             

                if (request.body.staff.coach?.kick && request.body.staff.coach.user?._id !== team.owner.toString()){
                    team.staff.coach = {};
                }

                if (request.body.staff.manager && request.body.staff.manager.kick && request.body.staff.manager?.user?._id !== team.owner.toString()){
                    team.staff.manager = {};
                }
                team.state.ready = request.body.state.ready;
            }

            let currentMember: string;
            let memberIndex: number|string;

            for (const [index, member] of request.body.members.entries()) {
                if (member.user._id === user._id.toString()) {
                    currentMember = member;
                    memberIndex = index;
                }
            }

            if (currentMember) {
                team.members[memberIndex].username = currentMember.username;
            }

            if (request.body.staff.coach?.user?._id === user._id.toString()) {
                team.staff.coach.username = request.body.staff.coach.username;
            }

            if (request.body.staff.manager?.user?._id === user._id.toString()) {
                team.staff.manager.username = request.body.staff.manager.username;
            }
            
            await team.save();

            reply.send({
                message: "L'équipe a correctement été mise à jour.",
                success: true
            });
        }
    );
}
