import "@/database/test";
import * as Fake from "@/database/test/fake";
import UserModel from "@/modules/user/model";
import { userSearch } from "@/modules/admin/lib/search";

describe("admin/lib/search", () => {
    test("it find the right user", async () => {
        const user1 = await Fake.generate(UserModel, { username: "abcd1234" });
        const user2 = await Fake.generate(UserModel, { username: "efgh5678" });

        const userResult = await userSearch({ limit: 5, search: "abcd1234", skip: 0 });

        expect(userResult._id).toMatchObject(user1._id);
    });
});
