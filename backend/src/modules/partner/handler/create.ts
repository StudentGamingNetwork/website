import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import PartnerModel from "../model";
import * as UserLib from "@/modules/user/lib";
import { ERoles } from "@/modules/user/model";

const SchemaResponse = Type.Object({
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
            UserLib.assertRoles(user, [ERoles.Member, ERoles.Partnership]);

            await PartnerModel.create({
                name: "Nouveau partenaire",
                description: "",
                logo: "",
                networks: {
                    facebook: "",
                    twitter: "",
                    website: ""
                },
                public: false
            });

            reply.send({
                message: "Le partenaire a correctement été créée.",
                success: true
            });
        }
    );
}
