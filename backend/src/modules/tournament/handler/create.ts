import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";
import TournamentModel from "@/modules/tournament/model";

const SchemaResponse = Type.Object({
    id: Type.String(),
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: null; Response: TSchemaResponse }>(
        "/create",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament]);

            const tournament = await TournamentModel.create({
                title: "Nouveau tournoi",
                description: "",
                game: {
                    team: {
                    }
                },
                informations: {

                },
                setting: {

                },
                state: {
                    archived: false,
                    public: false
                }
            });

            reply.send({
                id: tournament._id,
                message: "Le tournoi a correctement été créé.",
                success: true
            });
        }
    );
}
