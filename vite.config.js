import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";

const entries = ["resources/css/app.css", "resources/js/app.js"];
const ssrEntry = "resources/js/ssr.js";
export default defineConfig({
    plugins: [
        tailwindcss(),
        preact(),
        laravel({
            input: entries,
            ssr: ssrEntry,
            refresh: true,
        }),
    ],
});
