import type { Plugin } from "vite";
import { HtmlPrerenderOptions } from "./types.js";
declare const htmlPrerender: (options: HtmlPrerenderOptions) => Plugin;
export default htmlPrerender;
