import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import createHttpError from "http-errors";
import * as UserLib from "@/modules/user/lib";
import TeamModel from "@/modules/team/model";
import { ERoles, IUserDocument } from "@/modules/user/model";
import TournamentModel from "@/modules/tournament/model";
import * as ToornamentLib from "@/modules/team/lib/toornament";


const SchemaBody = Type.Object({
    _id: Type.String()
});

type TSchemaBody = Static<typeof SchemaBody>;

const SchemaResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    body: SchemaBody,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TSchemaBody; Response: TSchemaResponse }>(
        "/export",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament]);

            const team = await TeamModel.findOne({
                _id: request.body._id
            }).populate({ path: "members.user", populate: { path: "association" } });

            if (!team) {
                throw new httpErrors.NotFound("Aucune équipe trouvée.");
            }

            const tournament = await TournamentModel.findById(team.tournament);

            if (!tournament) {
                throw new httpErrors.NotFound("Aucun tournoi trouvée.");
            }

            if (!tournament.settings.toornament) {
                throw new httpErrors.NotFound("Aucun ID toornament.");
            }

            if (tournament.game.team.playersNumber === 1) {
                const player = (team.members as any as Array<{user: IUserDocument; username: string}>)[0];

                const teamData = {
                    name: player.user.username,
                    custom_fields: {
                        name: player.user.student.name,
                        discord: player.user.platforms.discord || "",
                        ingame: player.username,
                        school: player.user.association?.school?.name || player.user.student.schoolName
                    },
                    custom_user_identifier: `sgn:${ player.user._id }`,
                    email: player.user.mail,
                    tournament_id: tournament.settings.toornament,
                    type: "player"
                };

                try {
                    const toornamentToken = await ToornamentLib.getToken();
                    await ToornamentLib.createParticipant(toornamentToken, teamData);
                }
                catch (error) {
                    throw new createHttpError.InternalServerError(error);
                }
            }
            else {
                const players = (team.members as any as Array<{user: IUserDocument; username: string}>);

                const lineup = [];

                for (const player of players) {
                    lineup.push({
                        name: player.user.username,
                        custom_fields: {
                            name: player.user.student.name,
                            discord: player.user.platforms.discord,
                            ingame: player.username,
                            school: player.user.association?.school?.name || player.user.student.schoolName
                        },
                        custom_user_identifier: `sgn:${ player.user._id }`,
                        email: player.user.mail
                    });
                }

                const teamData = {
                    name: team.settings.name,
                    custom_fields: {
                        tag: team.settings.tag
                    },
                    custom_user_identifier: `sgn:${ team._id }`,
                    lineup,
                    tournament_id: tournament.settings.toornament,
                    type: "team"
                };

                try {
                    const toornamentToken = await ToornamentLib.getToken();
                    await ToornamentLib.createParticipant(toornamentToken, teamData);
                }
                catch (error) {
                    throw new createHttpError.InternalServerError(error);
                }
            }

            reply.send({
                message: "L'équipe a correctement été exportée.",
                success: true
            });
        }
    );
}
