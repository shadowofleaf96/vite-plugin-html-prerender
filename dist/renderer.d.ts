import { RenderedRoute } from "./types.js";
export default class Renderer {
    private _browser?;
    init(): Promise<void>;
    destroy(): Promise<void>;
    renderRoute(route: string, port: number, selector: string): Promise<RenderedRoute>;
    saveToFile(staticDir: string, renderedRoute: RenderedRoute): Promise<void>;
}
