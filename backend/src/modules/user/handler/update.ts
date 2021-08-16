import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import * as Bcrypt from "bcryptjs";
import httpErrors from "http-errors";
import * as UserLib from "../lib";
import { isPasswordStrong } from "../lib";
import { IUserDocument } from "@/modules/user/model";
import UserConfig from "@/modules/user/config";

const UserUpdate = Type.Object({
    password: Type.Optional(Type.Object({
        new: Type.String(),
        old: Type.String()
    })),
    student: Type.Optional(Type.Object({
        name: Type.String(),
        schoolName: Type.String()
    })),
    username: Type.Optional(Type.String({ minLength: 1 }))
});

type TUserUpdate = Static<typeof UserUpdate>;

const UserUpdateResponse = Type.Object({
    message: Type.String(),
    success: Type.Boolean()
});

type TUserUpdateResponse = Static<typeof UserUpdateResponse>;

const schema = {
    body: UserUpdate,
    response: {
        200: UserUpdateResponse
    }
};

export async function register(server: FastifyInstance): Promise<void> {
    server.post<{ Body: TUserUpdate; Response: TUserUpdateResponse }>(
        "/update",
        { schema },
        async (request, reply) => {
            const user = await UserLib.getUser(request);
            await update(user, request.body);

            reply.send({
                message: "Votre profil a correctement été mis à jour.",
                success: true
            });
        }
    );
}

async function update(user: IUserDocument, update: TUserUpdate) {
    if (update.password?.old) {
        if (!isPasswordStrong(update.password.new)) {
            throw new httpErrors.BadRequest("Le nouveau mot de passe n'est pas assez solide.");
        }

        const isPasswordCorrect = Bcrypt.compareSync(update.password.old, user.password);
        if (!isPasswordCorrect) {
            throw new httpErrors.BadRequest("Le précédent mot de passe n'est pas correct.");
        }

        const passwordSalt = Bcrypt.genSaltSync(UserConfig.login.saltRound);
        user.password = Bcrypt.hashSync(update.password.new, passwordSalt);
    }

    if (update.username) {
        user.username = update.username;
    }

    if (update.student) {
        user.student.name = update.student.name;
        user.student.schoolName = update.student.schoolName;
    }

    await user.save();
}
