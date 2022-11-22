import "@/database/test";
import * as Fake from "@/database/test/fake";
import UserModel from "@/modules/user/model";

describe("database/test/fake", () => {
    test("it should generate a fake user", async () => {
        const user = await Fake.generate(UserModel);

        const foundUser = await UserModel.findOne();

        if (!foundUser) {
            throw "User should be defined";
        }
        expect(user._id).toStrictEqual(foundUser._id);
        expect(user.mail).toBe(foundUser.mail);
    });
});
