import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import TeamModel from "@/modules/team/model";
import UserModel from "@/modules/user/model";
import TournamentModel from "@/modules/tournament/model";

const SchemaParams = Type.Object({
    tournamentId: Type.String()
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaRequest = Type.Object({
    mail: Type.String({ format: "email" }),
    role: Type.String({ enum: ["player", "coach", "manager"] }),
    teamId: Type.String()
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
    server.post<{ Body: TSchemaRequest; Params: TSchemaParams; Response: TSchemaResponse }>(
        "/add/member/:tournamentId",
        { schema },
        async (request, reply) => {
            const user = await UserModel.findOne({ mail: request.body.mail });

            if (!user) {
                throw new httpErrors.NotFound("Aucun utilisateur trouvé.");
            }

            const previousTeam = await TeamModel.findOne({
                $or: [{ "members.user": user._id },{ "staff.coach.user": user._id },{ "staff.manager.user": user._id }],
                tournament: request.params.tournamentId
            });

            if (previousTeam) {
                throw new httpErrors.Forbidden("L'utilisateur est déjà dans une équipe");
            }

            const team = await TeamModel.findOne({
                _id: request.body.teamId,
                tournament: request.params.tournamentId
            });

            const tournament = await TournamentModel.findById(request.params.tournamentId);

            if (!tournament) {
                throw new httpErrors.NotFound("Aucun tournoi trouvé.");
            }

            if (!team) {
                throw new httpErrors.NotFound("Aucune équipe trouvée.");
            }

            switch (request.body.role) {
                case "player":
                    if (request.body.role === "player" && team.members.length >= tournament.game.team.playersNumber + tournament.game.team.substitutesNumber) {
                        throw new httpErrors.NotFound("Cette équipe est déjà complète");
                    }
                    team.members.push({
                        user: user._id,
                        username: ""
                    });
                    break;

                case "coach":
                    if (!tournament.game.team.coachEnabled){
                        throw new httpErrors.Forbidden("Les coachs ne sont pas activés pour ce tournoi");
                    }
                    if (team.staff.coach.user) {
                        throw new httpErrors.NotFound("Cette équipe a déjà un coach");
                    }
                    team.staff.coach = {
                        user: user._id,
                        username: ""
                    };
                    break;

                case "manager":
                    if (!tournament.game.team.managerEnabled){
                        throw new httpErrors.Forbidden("Les managers ne sont pas activés pour ce tournoi");
                    }
                    if (team.staff.manager.user) {
                        throw new httpErrors.NotFound("Cette équipe a déjà un manager");
                    }
                    team.staff.manager = {
                        user: user._id,
                        username: ""
                    };
                    break;
            }
    
            await team.save();

            reply.send({
                message: "L'utilisateur a été ajouté à l'équipe.",
                success: true
            });
        }
    );
}
