import path from "node:path";
import { defineConfig, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ command }) => {
    const config: UserConfig = {
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        fontAwesome: [
                            "@fortawesome/vue-fontawesome",
                            "@fortawesome/fontawesome-svg-core",
                            "@fortawesome/free-brands-svg-icons",
                            "@fortawesome/free-solid-svg-icons"
                        ]
                    }
                }
            }
        },
        optimizeDeps: {
            include: [
                "leaflet",
                "leaflet/dist/leaflet-src.esm.js"
            ]
        },
        plugins: [vue()],
        resolve: {
            alias: [
                {
                    find: /^leaflet$/,
                    replacement: "leaflet/dist/leaflet-src.esm.js"
                },
                {
                    find: "@",
                    replacement: path.resolve(__dirname, "src")
                }
            ],
            dedupe: ["leaflet"]
        },
        server: {
            host: "127.0.0.1",
            port: 8080
        }
    };

    if (command === "build") {
        config.base = "/static/";
    }

    return config;
});
