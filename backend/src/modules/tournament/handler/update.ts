import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "@/modules/user/lib";
import TeamModel from "@/modules/team/model";
import { TypeTeam } from "@/modules/team/type";

const SchemaParams = Type.Object({
    id: Type.String({ minLength: 1 })
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaRequest = TypeTeam;

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

            const team = await TeamModel.findById(request.params.id);

            if (!team) {
                throw new httpErrors.NotFound("Aucune équipe trouvée.");
            }

            if (team.users.owner.toString() === user._id.toString()) {
                team.settings.name = request.body.settings.name;
                team.settings.tag = request.body.settings.tag;
            }

            await team.save();

            reply.send({
                message: "L'équipe a correctement été mise à jour.",
                success: true
            });
        }
    );
}
