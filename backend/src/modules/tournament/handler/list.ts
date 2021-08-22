import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import TournamentModel from "../model";
import { TypeTournament } from "@/modules/tournament/type";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";

enum ETournamentType {
    Coming = "coming",
    Current = "current",
    Past = "past"
}

const SchemaParams = Type.Object({
    type: Type.Enum(ETournamentType)
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaResponse = Type.Array(Type.Partial(TypeTournament));

type TSchemaResponse = Static<typeof SchemaResponse>;


const schema = {
    params: SchemaParams,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Params: TSchemaParams; Response: TSchemaResponse }>(
        "/list/:type",
        { schema },
        async (request, reply) => {
            const type = request.params.type;
            const findParameters = {} as Record<string, any>;

            try {
                const user = await UserLib.getUser(request);
                const hasTournamentRight = UserLib.hasRoles(user, [ERoles.Member, ERoles.Tournament]);

                if (!hasTournamentRight) {
                    findParameters["state.public"] = true;
                }
            }
            catch (error) {
                findParameters["state.public"] = true;
            }

            switch (type) {
            case ETournamentType.Coming:
                findParameters["state.archived"] = false;
                findParameters.$or = [
                    { "dates.subscriptionClose": { $gt: new Date() } },
                    { "dates.subscriptionClose": null }
                ];
                break;
            case ETournamentType.Current:
                findParameters["state.archived"] = false;
                findParameters["dates.subscriptionClose"] = { $lt: new Date() };
                break;
            case ETournamentType.Past:
                findParameters["state.archived"] = true;
                break;
            }

            const tournaments = await TournamentModel.find(findParameters).sort({ _id: -1 });

            reply.send(tournaments);
        }
    );
}
