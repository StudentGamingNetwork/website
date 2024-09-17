import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "@/modules/user/lib";
import * as TournamentLib from "@/modules/tournament/lib";
import { ERoles } from "@/modules/user/model";
import { TypeCompleteTeam } from "@/modules/team/type";
import TeamModel from "@/modules/team/model";



const SchemaRequest = Type.Object({
    _id: Type.Optional(Type.String()),
    slug: Type.String()
});

type TSchemaRequest = Static<typeof SchemaRequest>;

const SchemaResponse = Type.Object({
    message: Type.Optional(Type.String()),
    success: Type.Boolean(),
    team: Type.Optional(Type.Partial(TypeCompleteTeam))
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
        "/details",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);

            UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament]);
            
            const tournament = await TournamentLib.getTournamentFromSlug(request.body.slug);

            const response: TSchemaResponse = {
                success: true
            };

            if (request.body._id) {
                const team = await TeamModel.findById(request.body._id)
                    .populate({ path: "members.user", populate: { path: "association" } })
                    .exec();

                if (!team) {
                    throw new httpErrors.NotFound("Aucune équipe trouvée");
                }

               
                response.team = team as any;
            }

            else {
                const teamCount = await TeamModel.count({
                    $or: [
                        { "state.ready": false },
                        { "state.validated": false }
                    ],
                    tournament: tournament._id
                });
                const randomCount = Math.floor(Math.random() * teamCount);

                const team = await TeamModel
                    .findOne({
                        $or: [
                            { "state.ready": false },
                            { "state.validated": false }
                        ],
                        tournament: tournament._id
                    })
                    .skip(randomCount)
                    .populate({ 
                        path: "members.user",
                        populate: { path: "association" } 
                    })
                    .exec();

                response.team = team as any;
            }

            reply.send(response);
        }
    );
}
