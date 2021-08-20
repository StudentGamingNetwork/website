import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "@/modules/user/lib";
import AssociationModel from "@/modules/association/model";
import * as AssociationLib from "@/modules/association/lib";


const SchemaRequest = Type.Object({
    invitationCode: Type.String({ minLength: 1 }),
    slug: Type.String({ minLength: 1 })
});

type TSchemaRequest = Static<typeof SchemaRequest>;

const SchemaResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TSchemaResponse = Static<typeof SchemaResponse>;

const schema = {
    body: SchemaRequest,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TSchemaRequest; Response: TSchemaResponse }>(
        "/join",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);

            const newAssociation = await AssociationLib.getAssociationFromSlug(request.body.slug);

            if (newAssociation.settings.invitationCode !== request.body.invitationCode) {
                throw new httpErrors.Forbidden("Le lien d'invitation n'est pas valide.");
            }

            if (user.association) {
                const currentAssociation = await AssociationModel.findById(user.association);

                if (!currentAssociation) {
                    throw new httpErrors.InternalServerError("Aucune association trouvée.");
                }

                if (currentAssociation.users.owner.toString() === user._id.toString()) {
                    throw new httpErrors.Forbidden("Vous ne pouvez pas rejoindre une association en étant déjà propriétaire d'une.");
                }

                currentAssociation.users.members = currentAssociation.users.members.filter((id) => id.toString() !== user._id.toString());
                await currentAssociation.save();
            }

            user.association = newAssociation._id;
            newAssociation.users.members.push(user._id);

            await user.save();
            await newAssociation.save();

            reply.send({
                message: "Vous avez correctement rejoint cette association.",
                success: true
            });
        }
    );
}
