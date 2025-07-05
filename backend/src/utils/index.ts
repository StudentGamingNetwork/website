import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import * as Cookie from "./cookie";
import { env } from "@/utils/environment";

export { Cookie };

config();

const environment: string = env.NODE_ENV;

export const isDevEnvironment = (environment === "development");
export const isTestEnvironment = (environment === "test");

export const frontOrigin = process.env.FRONT_ORIGIN || "";
export const backOrigin = process.env.BACK_ORIGIN || "";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const rootFolder = path.resolve(__dirname, "../../");

export const backupDir = process.env.DB_BACKUP_DIR || "";
