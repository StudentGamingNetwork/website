import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import AssociationModel, { ERegion } from "../model";
import * as AssociationLib from "../lib";
import * as UserLib from "@/modules/user/lib";

const SchemaRequest = Type.Object({
    name: Type.String({ maxLength: 64, minLength: 1 }),
    mail: Type.String({ format: "email" }),
    school: Type.String({ maxLength: 64, minLength: 1 })
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
        "/create",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);

            if (user.association) {
                throw new httpErrors.Forbidden("Vous avez déjà une association.");
            }

            const association = await AssociationModel.create({
                name: request.body.name,
                federation: {
                    isValidated: false,
                    region: ERegion.none
                },
                lastOwnerChange: new Date(),
                mail: request.body.mail,
                networks: {},
                platforms: {},
                school: {
                    name: request.body.school,
                    address: "",
                    studentsNumber: 0
                },
                settings: {
                    invitationLink: AssociationLib.generateInvitationLink(),
                    slug: ""
                },
                users: {
                    members: [user.id],
                    owner: user.id
                }
            });

            user.association = association.id;

            await user.save();

            reply.send({
                message: "L'association a correctement été créée.",
                success: true
            });
        }
    );
}
