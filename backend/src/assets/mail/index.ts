import { readFile } from "fs/promises";
import { join } from "path";

const forgottenPassword = readFile(
    join(__dirname, "passwordForgotten.html"),
    "utf-8"
);


export { forgottenPassword };
