# vite-plugin-html-prerender

Vite.js plugin for pre-rendering html for SPAs.

Updated to use html-minifier-terser instead html-minifier to fix CVE-2022-37620/ ReDoS Vulnerability 

## Install

```shell
npm i -D git+https://git@github.com/shadowofleaf96/vite-plugin-html-prerender
```

## Usage

Add `htmlPrerender` to your configuration (`vite.config.js`/`vite.config.ts`):

```typescript
import { defineConfig } from "vite";
import { htmlPrerender } from "vite-plugin-html-prerender";
import path from "path";

export default defineConfig({
  plugins: [
    htmlPrerender({
      /**
       * Required: Output directory of `vite build`.
       */
      staticDir: path.join(__dirname, "dist"),

      /**
       * Required: List of routes to pre-render.
       */
      routes: ["/", "/about"],

      /**
       * Optional: Query selector to wait for. Defaults to `#root`.
       */
      selector: "main",

      /**
       * Optional: To minify html.
       */
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true,
      },
    }),
  ],
});
```
