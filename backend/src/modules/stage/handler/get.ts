import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { TypeStage } from "@/modules/stage/type";
import StageModel from "@/modules/stage/model";

const SchemaParams = Type.Object({
    id: Type.String({ minLength: 1 })
});

type TSchemaParams = Static<typeof SchemaParams>;

const SchemaResponse = Type.Partial(Type.Array(TypeStage));

type TSchemaResponse = Static<typeof SchemaResponse>;


const schema = {
    params: SchemaParams,
    response: {
        200: SchemaResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.get<{ Params: TSchemaParams; Response: TSchemaResponse }>(
        "/get/:id",
        { schema },
        async (request, reply) => {
    
            const id = request.params.id;
            const stage = await StageModel.findById(id);

            reply.send(stage);
        }
    );
}
