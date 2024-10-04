import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { connectDatabase, closeDatabase } from "@/database";
import { isTestEnvironment } from "@/utils";
import { env } from "@/utils/environment";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    if (!isTestEnvironment) {
        throw new Error("You must be in test environment to execute the tests");
    }

    mongoServer = await MongoMemoryServer.create();
    env.DB_URI = mongoServer.getUri();
    await connectDatabase();
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await closeDatabase();
    await mongoServer.stop();
});
