import "@/database/test";
import * as UserLib from "@/modules/user/lib";

describe("user/lib/signup", () => {

    test("it should throw an error when password is weak", async () => {
        const weakPassword = "ded58z";

        const loginPromise = UserLib.signup("falcon", "corentin@gmail.com", weakPassword);

        await expect(loginPromise).rejects.toThrow("Weak password");
    });

    describe("isPasswordString", () => {
        test("it should return true when password is strong", async () => {
            const strongPassword = "1234ABcd";

            const isPasswordStrong = UserLib.isPasswordStrong(strongPassword);

            expect(isPasswordStrong).toBeTruthy();
        });

        test("it should return false when password is missing uppercase letter", async () => {
            const weakPassword = "1234abcd";

            const isPasswordStrong = UserLib.isPasswordStrong(weakPassword);

            expect(isPasswordStrong).toBeFalsy();
        });

        test("it should return false when password is missing lowercase letter", async () => {
            const weakPassword = "1234ABCD";

            const isPasswordStrong = UserLib.isPasswordStrong(weakPassword);

            expect(isPasswordStrong).toBeFalsy();
        });

        test("it should return false when password is missing a number", async () => {
            const weakPassword = "ABcddere";

            const isPasswordStrong = UserLib.isPasswordStrong(weakPassword);

            expect(isPasswordStrong).toBeFalsy();
        });

        test("it should work false when password is smaller than expected", async () => {
            const weakPassword = "1234Ac";

            const isPasswordStrong = UserLib.isPasswordStrong(weakPassword);

            expect(isPasswordStrong).toBeFalsy();
        });
    });
});
