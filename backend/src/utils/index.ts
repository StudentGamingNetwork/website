import path from "path";
import { config } from "dotenv";
import * as Cookie from "./cookie";

export { Cookie };

config();

const environment: string = process.env.NODE_ENV || "development";

export const isDevEnvironment = (environment === "development");
export const isTestEnvironment = (environment === "test");

export const frontOrigin = process.env.FRONT_ORIGIN || "";
export const backOrigin = process.env.BACK_ORIGIN || "";

export const rootFolder = path.resolve(__dirname, "../../");
