import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "@/modules/user/lib";
import * as TournamentLib from "@/modules/tournament/lib";
import TeamModel from "@/modules/team/model";

const SchemaRequest = Type.Object({
    slug: Type.String({ minLength: 1 })
});

type TSchemaRequest = Static<typeof SchemaRequest>;

const SchemaResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    params: SchemaRequest,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.delete<{ Params: TSchemaRequest; Response: TSchemaResponse }>(
        "/delete/:slug",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            const tournament = await TournamentLib.getTournamentFromSlug(request.params.slug);

            const team = await TeamModel.findOne({
                "members.user": user._id,
                tournament: tournament._id
            });

            if (!team) {
                throw new httpErrors.NotFound("Aucune équipe trouvée.");
            }

            if (team.owner.toString() === user._id.toString()) {
                await TeamModel.findByIdAndDelete(team._id);
                tournament.game.team.subscribed--;
                await tournament.save();
            }
            else {
                team.members = team.members.filter((member) => member.user.toString() !== user._id.toString());
                await team.save();
            }

            reply.send({
                message: "L'équipe a correctement été supprimée.",
                success: true
            });
        }
    );
}
