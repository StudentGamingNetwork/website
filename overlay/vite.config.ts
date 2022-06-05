import { defineConfig, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ command }) => {
    const config: UserConfig = {
        plugins: [vue()],
        server: {
            port: 8080
        }
    };

    if (command === "build") {
        config.base = "/static/overlay/";
    }

    return config;
});
