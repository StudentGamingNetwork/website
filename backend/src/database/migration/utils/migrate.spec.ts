import "@/database/test";
import * as Migrate from "./migrate";
import { db } from "@/database";

describe("Migrations", () => {
    describe("getMigrationFile()", () => {
        test("should return false is there's no config collection", async () => {
            const migrationFile = Migrate.getMigrationFile(0);

            expect(migrationFile).toBe("0000_createMigrationConfig.ts");
        });
    });

    describe("getCurrentMigrationId()", () => {
        beforeEach(async() => {
            await db.dropDatabase();
        });

        test("should return -1 before the migration", async () => {
            const currentMigrationId = await Migrate.getCurrentMigrationId();

            expect(currentMigrationId).toBe(-1);
        });

        test("should return 0 after the migration", async () => {
            await Migrate.applyMigration(0);

            const currentMigrationId = await Migrate.getCurrentMigrationId();

            expect(currentMigrationId).toBe(0);
        });

        afterAll(async() => {
            await Migrate.migrateToLatest();
        });
    });
});
