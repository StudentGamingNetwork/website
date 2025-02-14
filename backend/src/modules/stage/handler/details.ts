import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";
import { TypeStage } from "@/modules/stage/type";
import StageModel from "@/modules/stage/model";



const SchemaRequest = Type.Object({
    _id: Type.Optional(Type.String()),
    slug: Type.String()
});

type TSchemaRequest = Static<typeof SchemaRequest>;

const SchemaResponse = Type.Object({
    message: Type.Optional(Type.String()),
    stage: Type.Optional(TypeStage),
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
        "/details",
        { schema },
        async (request, reply) => {

            const user = await UserLib.getUser(request);

            UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament]);

            const response: TSchemaResponse = {
                success: true
            };

            const stage = await StageModel.findById(request.body._id)
                .exec();

            if (!stage) {
                throw new httpErrors.NotFound("Aucune étape trouvée");
            }
            response.stage = stage as any;
    
            reply.send(response);
        }
    );
}
