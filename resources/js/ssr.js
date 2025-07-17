import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { renderToString } from "preact-render-to-string";
import { h } from "preact";

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: (name) => {
            const exts = ["jsx", "tsx"];
            const pages = import.meta.glob("./Pages/**/*.{jsx,tsx}", {
                eager: true,
            });
            const matchedExt = exts.find((d) =>
                pages[`./Pages/${name}.${d}`]
            );
            return pages[`./Pages/${name}.${matchedExt}`];
        },
        setup: ({ App, props }) => h(App, props),
    })
);
