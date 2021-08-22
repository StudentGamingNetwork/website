import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "@/modules/user/lib";
import { TypeCompleteTeam } from "@/modules/team/type";
import TeamModel from "@/modules/team/model";
import * as TournamentLib from "@/modules/tournament/lib";
import { ERoles } from "@/modules/user/model";

const SchemaParams = Type.Object({
    slug: Type.String()
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaResponse = Type.Array(Type.Partial(TypeCompleteTeam));

type TSchemaResponse = Static<typeof SchemaResponse>;


const schema = {
    params: SchemaParams,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Params: TSchemaParams; Response: TSchemaResponse }>(
        "/list/:slug",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament]);

            const tournament = await TournamentLib.getTournamentFromSlug(request.params.slug);

            const teams = await TeamModel.find({
                tournament: tournament._id
            })
                .populate({
                    path: "members.user",
                    populate: {
                        path: "association"
                    }
                })
                .exec();

            reply.send(teams);
        }
    );
}
