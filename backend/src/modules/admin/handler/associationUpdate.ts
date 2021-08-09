import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import AssociationModel, { ERegion } from "@/modules/association/model";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";

const SchemaRequest = Type.Object({
    _id: Type.String(),
    isValidated: Type.Optional(Type.Boolean()),
    region: Type.Optional(Type.String())
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
        "/association/update",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member, ERoles.Federation]);

            await associationUpdate(request.body);

            reply.send({
                message: "L'association a correctement été mis à jour.",
                success: true
            });
        }
    );
}

async function associationUpdate({ _id, isValidated, region }: {_id: string; isValidated?: boolean; region?: string }): Promise<void> {

    const association = await AssociationModel.findById(_id);

    if (!association) {
        throw new httpErrors.NotFound("Impossible de trouver cette association.");
    }

    if (isValidated !== undefined) {
        association.federation.isValidated = isValidated;
    }

    if (region) {
        association.federation.region = region as ERegion;
    }

    await association.save();
}
