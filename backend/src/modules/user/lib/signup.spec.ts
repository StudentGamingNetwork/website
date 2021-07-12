import "@/database/test";
import * as UserLib from "@/modules/user/lib";
import UserModel from "@/modules/user/model";
import * as Fake from "@/database/test/fake";

describe("user/lib/signup", () => {

    describe("signup", () => {
        test("it should throw an error when password is weak", async () => {
            const weakPassword = "ded58z";

            const loginPromise = UserLib.signup("hello@sgnw.fr", weakPassword);

            await expect(loginPromise).rejects.toThrow("Weak password");
        });
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

    describe("isMailValid", () => {
        test("it should be false when mail is invalid", async () => {
            const badMail = "hello.sgnw.fr";

            const isMailValid = UserLib.isMailValid(badMail);

            await expect(isMailValid).toBeFalsy();
        });
        test("it should be true when mail is valid", async () => {
            const goodMail = "hello@sgnw.fr";

            const isMailValid = UserLib.isMailValid(goodMail);

            await expect(isMailValid).toBeTruthy();
        });
    });

    describe("isMailAlreadyRegistered", () => {
        test("it should be false when mail is not already registered", async () => {
            const mail = "hello@sgnw.fr";

            const isMailAlreadyRegistered = await UserLib.isMailAlreadyRegistered(mail);

            await expect(isMailAlreadyRegistered).toBeFalsy();
        });
        test("it should be true when mail is already registered", async () => {
            const mail = "hello@sgnw.fr";
            await Fake.generate(UserModel, { mail });

            const isMailAlreadyRegistered = await UserLib.isMailAlreadyRegistered(mail);

            await expect(isMailAlreadyRegistered).toBeTruthy();
        });
    });
});
