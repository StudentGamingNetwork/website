import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import httpErrors from "http-errors";
import * as UserLib from "@/modules/user/lib";
import UserModel, { ERoles, EStudentStatus } from "@/modules/user/model";
import { TypeAdminUser } from "@/modules/user/type";


const SchemaRequest = Type.Object({
    _id: Type.Optional(Type.String()),
    status: Type.Optional(Type.Enum(EStudentStatus))
});

type TSchemaRequest = Static<typeof SchemaRequest>;

const SchemaResponse = Type.Object({
    message: Type.Optional(Type.String()),
    success: Type.Boolean(),
    user: Type.Optional(TypeAdminUser)
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
        "/user/certificate",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            UserLib.assertRoles(user, [ERoles.Member, ERoles.Tournament]);

            const response: TSchemaResponse = {
                success: true
            };

            if (request.body?._id) {
                const student = await UserModel.findById(request.body._id);

                if (!student) {
                    throw new httpErrors.NotFound("Aucune utilisateur trouvé");
                }

                student.student.status = request.body.status;
                await student.save();

                response.message = "L'état du certificat a correctement été enregistré.";
            }

            const userCount = await UserModel.count({
                "student.status": "processing"
            });
            const randomCount = Math.floor(Math.random() * userCount);

            const student = await UserModel
                .findOne({
                    "student.status": "processing"
                })
                .skip(randomCount)
                .populate("association")
                .exec();

            if (student) {
                response.user = student as any;
            }

            reply.send(response);
        }
    );
}
