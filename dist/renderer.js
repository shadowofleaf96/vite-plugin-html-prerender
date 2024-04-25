import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
export default class Renderer {
    _browser;
    async init() {
        const options = {
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        };
        this._browser = await puppeteer.launch(options);
    }
    async destroy() {
        await this._browser?.close();
    }
    async renderRoute(route, port, selector) {
        if (!this._browser) {
            throw Error("Headless browser instance not started. Failed to prerender.");
        }
        const page = await this._browser.newPage();
        await page.goto(`http://localhost:${port}${route}`);
        await page.waitForSelector(selector, { timeout: 10000 });
        const html = await page.content();
        return { route, html };
    }
    async saveToFile(staticDir, renderedRoute) {
        const target = path.join(staticDir, renderedRoute.route, "index.html");
        const directory = path.dirname(target);
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
        fs.writeFileSync(target, renderedRoute.html);
    }
}
