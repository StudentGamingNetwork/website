import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import AssociationModel from "@/modules/association/model";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";
import { TypeTournament } from "@/modules/tournament/type";
import * as TournamentLib from "@/modules/tournament/lib";

const SchemaParams = Type.Object({
    slug: Type.String({ minLength: 1 })
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaRequest = TypeTournament;

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
        "/update/:slug",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);

            UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament]);

            const tournament = await TournamentLib.getTournamentFromSlug(request.params.slug);

            if (request.body.settings?.slug) {
                const slugRegex = /^[A-Za-z-]+$/;
                if (!slugRegex.test(request.body.settings.slug)) {
                    throw new httpErrors.BadRequest("Le slug n'est pas au bon format.");
                }

                if (await AssociationModel.findOne({ _id: { $ne: tournament._id }, "settings.slug": request.body.settings.slug })) {
                    throw new httpErrors.Forbidden("Un autre tournoi utilise déjà ce slug.");
                }
            }

            tournament.name = request.body.name;

            await tournament.save();

            reply.send({
                message: "Le tournoi a correctement été mis à jour.",
                success: true
            });
        }
    );
}
