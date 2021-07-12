import "@/database/test";
import * as Bcrypt from "bcryptjs";
import * as Fake from "@/database/test/fake";
import UserModel from "@/modules/user/model";
import * as UserLib from "@/modules/user/lib";

describe("user/lib/login", () => {

    test("it should work when provided a good password", async () => {
        const password = "1234";
        const user = await Fake.generate(UserModel, { password: Bcrypt.hashSync(password, 8) });

        const userResult = await UserLib.login(user.mail, password);

        expect(userResult._id).toMatchObject(user._id);
    });

    test("it should  throw an error when provided a bad password", async () => {
        const password = "1234";
        const badPassword = "5678";
        const user = await Fake.generate(UserModel, { password: Bcrypt.hashSync(password, 8) });

        const userResultPromise = UserLib.login(user.mail, badPassword);

        await expect(userResultPromise).rejects.toThrow("[userModule][login] - password don't match");
    });
});
