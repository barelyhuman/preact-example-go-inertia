import { createInertiaApp } from "@inertiajs/react";
import { h, hydrate } from "preact";
// import "../css/app.css";

createInertiaApp({
    resolve: (name) => {
        const exts = ["jsx", "tsx"];
        const pages = import.meta.glob("./Pages/**/*.{jsx,tsx}", {
            eager: true,
        });
        const matchedExt = exts.find((d) => pages[`./Pages/${name}.${d}`]);
        return pages[`./Pages/${name}.${matchedExt}`];
    },
    setup({ el, App, props }) {
        hydrate(h(App, props), el);
    },
});
