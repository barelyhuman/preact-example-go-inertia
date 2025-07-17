import laravel from "laravel-vite-plugin";
import {defineConfig} from "vite"
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
        preact(),
        laravel({
            input: [ "resources/css/app.css","resources/js/app.js"],
            ssr: "resources/js/ssr.js",
            refresh: true,
        }),
    ],
});
