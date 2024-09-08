import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "@/modules/user/lib";
import { TypeCompleteTeamAdmin } from "@/modules/team/type";
import TeamModel from "@/modules/team/model";
import * as TournamentLib from "@/modules/tournament/lib";
import { ERoles } from "@/modules/user/model";

const SchemaParams = Type.Object({
    management: Type.Union([
        Type.Literal("forming"),
        Type.Literal("ready"),
        Type.Literal("validated")
    ]),
    slug: Type.String()
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaResponse = Type.Array(Type.Partial(TypeCompleteTeamAdmin));

type TSchemaResponse = Static<typeof SchemaResponse>;


const schema = {
    params: SchemaParams,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Params: TSchemaParams; Response: TSchemaResponse }>(
        "/list/:slug/:management",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament]);

            const tournament = await TournamentLib.getTournamentFromSlug(request.params.slug);

            const findParameters = {
                tournament: tournament._id
            } as Record<string, any>;

            switch (request.params.management){
            case "forming":
                findParameters["state.ready"] = false;
                findParameters["state.validated"] = false;
                break;
            case "ready":
                findParameters["state.ready"] = true;
                findParameters["state.validated"] = false;
                break;
            case "validated":
                findParameters["state.validated"] = true;
                break;
            }

            const teams = await TeamModel
                .find(findParameters)
                .populate({
                    path: "members.user",
                    populate: {
                        path: "association"
                    }
                })
                .populate({
                    path: "staff.user",
                    populate: {
                        path: "association"
                    }
                })
                .exec();

            reply.send(teams);
        }
    );
}
