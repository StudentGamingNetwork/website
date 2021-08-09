import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import AssociationModel, { EAssociationState, ERegion } from "../model";
import * as UserLib from "@/modules/user/lib";

const AssociationCreate = Type.Object({
    name: Type.String({ maxLength: 64, minLength: 1 }),
    mail: Type.String({ format: "email" }),
    school: Type.String({ maxLength: 64, minLength: 1 })
});

type TAssociationCreate = Static<typeof AssociationCreate>;

const AssociationCreateResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TAssociationCreateResponse = Static<typeof AssociationCreateResponse>;


const schema = {
    body: AssociationCreate,
    response: {
        200: AssociationCreateResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TAssociationCreate; Response: TAssociationCreateResponse }>(
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
                    region: ERegion.none,
                    state: EAssociationState.New
                },
                lastOwnerChange: new Date(),
                mail: request.body.mail,
                school: {
                    name: request.body.school,
                    address: "",
                    studentsNumber: 0
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
