/// <reference types="vitest" />

import * as path from "path";
import { defineConfig, UserConfig } from "vite";

const alias = {
    "@": path.resolve(__dirname, "src")
};

export default defineConfig(() => {
    const config: UserConfig = {
        resolve: {
            alias
        },
        server: {
            port: 8080
        }
    };

    config.test = {
        environment: "happy-dom",
        globals: true
    };

    return config;
});
