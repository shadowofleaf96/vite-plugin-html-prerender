"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const renderer_1 = __importDefault(require("./renderer"));
const html_minifier_terser_1 = require("html-minifier-terser");
const port = 0;
const defaultSelector = "#root";
const htmlPrerender = (options) => {
    return {
        name: "vite-plugin-html-prerender",
        apply: "build",
        enforce: "post",
        async closeBundle() {
            await emitRendered(options);
        },
    };
};
const emitRendered = async (options) => {
    const server = new server_1.default(port);
    const renderer = new renderer_1.default();
    await server
        .init(options.staticDir)
        .then(async () => {
        console.log("\n[vite-plugin-html-prerender] Starting headless browser...");
        return await renderer.init();
    })
        .then(async () => {
        const renderedRoutes = [];
        for (let route of options.routes) {
            console.log("[vite-plugin-html-prerender] Pre-rendering route:", route);
            renderedRoutes.push(await renderer.renderRoute(route, server.runningPort, options.selector || defaultSelector));
        }
        return renderedRoutes;
    })
        .then((renderedRoutes) => {
        if (options.minify) {
            console.log("[vite-plugin-html-prerender] Minifying rendered HTML...");
            renderedRoutes.forEach(async (route) => {
                route.html = await (0, html_minifier_terser_1.minify)(route.html, options.minify);
            });
        }
        return renderedRoutes;
    })
        .then(async (renderedRoutes) => {
        console.log("[vite-plugin-html-prerender] Saving pre-rendered routes to output...");
        for (let renderedRoute of renderedRoutes) {
            await renderer.saveToFile(options.staticDir, renderedRoute);
        }
    })
        .then(async () => {
        await renderer.destroy();
        await server.destroy();
        console.log("[vite-plugin-html-prerender] Pre-rendering routes completed.");
    })
        .catch(async (e) => {
        await renderer.destroy();
        await server.destroy();
        console.error("[vite-plugin-html-prerender] Failed to prerender routes:", e);
    });
};
exports.default = htmlPrerender;
