
import path from "path";
import { fileURLToPath } from "url";
import passwordForgottenHtml from "./passwordForgotten.html?raw";


const __filename = fileURLToPath(import.meta.url);

const forgottenPassword = Promise.resolve(passwordForgottenHtml);


export { forgottenPassword };
