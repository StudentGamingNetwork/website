import { readFile } from "fs/promises";
import path, { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const forgottenPassword = readFile(
    join(__dirname, "passwordForgotten.html"),
    "utf-8"
);


export { forgottenPassword };
