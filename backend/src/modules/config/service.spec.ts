import "@/database/test";
import * as ConfigService from "./service";

describe("config/service", () => {
    test("should not found the config", async () => {
        const doesConfigExist = await ConfigService.doesConfigExist("myConfig");

        expect(doesConfigExist).toBeFalsy();
    });
    test("should create a config", async () => {
        await ConfigService.createConfig("myConfig", {});

        const doesConfigExist = await ConfigService.doesConfigExist("myConfig");

        expect(doesConfigExist).toBeTruthy();
    });
    test("should retrieve the data of the config", async () => {
        await ConfigService.createConfig("myConfig", { value: 5 });

        const configData = await ConfigService.getConfigData("myConfig");

        expect(configData).toMatchObject({ value: 5 });
    });
    test("should update data of the config", async () => {
        await ConfigService.createConfig("myConfig", { value: 5 });
        await ConfigService.updateConfigData("myConfig", { value: 6 });

        const configData = await ConfigService.getConfigData("myConfig");

        expect(configData).toMatchObject({ value: 6 });
    });
});
