import mongoose from "mongoose";
import { config } from "dotenv";
import { env } from "@/utils/environment";

config();

export let db: mongoose.Connection;

export async function connectDatabase() {
    const options = {};
    await mongoose.connect(env.DB_URI as string, options);
    db = mongoose.connection;
}

export async function closeDatabase() {
    await mongoose.connection.close();
}
