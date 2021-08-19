import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";
import TournamentModel from "@/modules/tournament/model";

const SchemaRequest = Type.Object({
    id: Type.String({ minLength: 1 })
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
        "/delete/:id",
        { schema },
        async (request, reply) => {
            const tournamentId = request.params.id;

            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament, ERoles.Council]);

            await TournamentModel.findByIdAndDelete(tournamentId);

            reply.send({
                message: "Le tournoi a correctement été supprimée.",
                success: true
            });
        }
    );
}
