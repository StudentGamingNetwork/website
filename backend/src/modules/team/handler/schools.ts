import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { escapeRegExp } from "lodash";
import TeamModel from "@/modules/team/model";
import * as TournamentLib from "@/modules/tournament/lib";

const SchemaParams = Type.Object({
    search: Type.String(),
    slug: Type.String(),
    type: Type.Union([
        Type.Literal("all"),
        Type.Literal("validated")
    ])
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaResponse = Type.Array(
    Type.Object({
        name: Type.String(),
        count: Type.Number()
    })
);

type TSchemaResponse = Static<typeof SchemaResponse>;


const schema = {
    params: SchemaParams,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Params: TSchemaParams; Response: TSchemaResponse }>(
        "/schools/:slug/:type/:search",
        { schema },
        async (request, reply) => {

            const tournament = await TournamentLib.getTournamentFromSlug(request.params.slug);

            const tournamentMatch = {
                tournament: tournament._id
            } as Record<string, any>;

            if (request.params.type === "validated") {
                tournamentMatch["state.validated"] = true;
            }

            const searchStage = [];

            if (request.params.search) {
                searchStage.push({
                    "$match": {
                        "name": new RegExp(escapeRegExp(request.params.search), "i")
                    }
                });
            }

            const schools = await TeamModel.aggregate([
                {
                    "$match": tournamentMatch
                }, {
                    "$group": {
                        "_id": null,
                        "members": {
                            "$push": "$members.user"
                        }
                    }
                }, {
                    "$unwind": {
                        "path": "$members"
                    }
                }, {
                    "$unwind": {
                        "path": "$members"
                    }
                }, {
                    "$lookup": {
                        "as": "user",
                        "foreignField": "_id",
                        "from": "users",
                        "localField": "members"
                    }
                }, {
                    "$unwind": {
                        "path": "$user"
                    }
                }, {
                    "$lookup": {
                        "as": "association",
                        "foreignField": "_id",
                        "from": "associations",
                        "localField": "user.association"
                    }
                }, {
                    "$unwind": {
                        "path": "$association",
                        "preserveNullAndEmptyArrays": true
                    }
                }, {
                    "$project": {
                        "_id": "$user._id",
                        "schoolName": {
                            "$cond": [
                                {
                                    "$eq": [
                                        "$user.student.schoolName", ""
                                    ]
                                }, "$association.name", "$user.student.schoolName"
                            ]
                        }
                    }
                }, {
                    "$match": {
                        "schoolName": {
                            "$exists": 1
                        }
                    }
                }, {
                    "$group": {
                        "_id": "$schoolName",
                        "schoolName": {
                            "$sum": 1
                        }
                    }
                }, {
                    "$project": {
                        "name": "$_id",
                        "count": "$schoolName"
                    }
                },
                ...searchStage,
                {
                    "$sort": {
                        "count": -1
                    }
                }
            ]);

            reply.send(schools);
        }
    );
}
