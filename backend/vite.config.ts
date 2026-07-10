/// <reference types="vitest" />

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    },

    server: {
        port: 8080
    },

    build: {
        // Point d'entrée du backend Node.js
        ssr: fileURLToPath(new URL("./src/server.ts", import.meta.url)),

        outDir: "dist",
        emptyOutDir: true,

        // Compatible avec ton runtime Node.js 24
        target: "node20",

        // Minification du code serveur
        minify: "esbuild",

        sourcemap: false,

        rollupOptions: {
            /*
             * sharp contient des binaires natifs.
             * Il ne doit pas être intégré au bundle JavaScript.
             */
            external: [/^sharp(?:\/.*)?$/],

            output: {
                format: "es",

                // Génère précisément dist/server.js
                entryFileNames: "server.js",

                // Intègre les imports dynamiques dans server.js
                inlineDynamicImports: true
            }
        }
    },

    ssr: {
        target: "node",

        // Explicitement conservé comme dépendance runtime
        external: ["sharp"]
    },

    test: {
        environment: "happy-dom",
        globals: true
    }
});