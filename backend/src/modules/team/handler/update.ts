import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import { find, findIndex } from "lodash";
import * as UserLib from "@/modules/user/lib";
import { TypeCompleteTeam } from "@/modules/team/type";
import TeamModel from "@/modules/team/model";

const SchemaParams = Type.Object({
    id: Type.String()
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaRequest = TypeCompleteTeam;

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
        "/update/:id",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);

            const team = await TeamModel.findOne({
                _id: request.body._id,
                "members.user": user._id
            });

            if (!team) {
                throw new httpErrors.NotFound("Aucune équipe trouvée.");
            }

            if (team.owner.toString() === user._id.toString()){
                team.settings.name = request.body.settings.name || "";
                team.settings.tag = request.body.settings.tag || "";
            }

            const currentMember = find(request.body.members, ["user._id", user._id.toString()]);
            const memberIndex = findIndex(team.members, ["user._id", user._id]);

            if (currentMember) {
                team.members[memberIndex].username = currentMember.username;
            }

            await team.save();

            reply.send({
                message: "L'équipe a correctement été mise à jour.",
                success: true
            });
        }
    );
}
