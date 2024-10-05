import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "@/modules/user/lib";
import { TypeCompleteTeam } from "@/modules/team/type";
import TeamModel from "@/modules/team/model";
import * as TournamentLib from "@/modules/tournament/lib";

const SchemaParams = Type.Object({
    slug: Type.String(),
    teamId: Type.Optional(Type.String())
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaResponse = Type.Partial(TypeCompleteTeam);

type TSchemaResponse = Static<typeof SchemaResponse>;


const schema = {
    params: SchemaParams,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Params: TSchemaParams; Response: TSchemaResponse }>(
        "/get/:slug",
        { schema },
        async (request, reply) => {
            const tournament = await TournamentLib.getTournamentFromSlug(request.params.slug);

            const user = await UserLib.getUser(request);

            const team = await TeamModel.findOne({
                $or: [{ "members.user": user._id }, { "staff.coach.user": user._id }, { "staff.manager.user": user._id }],
                tournament: tournament._id
            })
                .populate([{
                    path: "staff.manager.user",
                    populate: {
                        path: "association"
                    }
                }, {
                    path: "staff.coach.user",
                    populate: {
                        path: "association"
                    }
                }, {
                    path: "members.user",
                    populate: {
                        path: "association"
                    }
                }])
                .exec();

            if (!team) {
                reply.send({});
                return;
            }

            reply.send(team);
        }
    );
}
