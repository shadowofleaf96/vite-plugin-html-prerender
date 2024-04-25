import express from "express";
import path from "path";
export default class Server {
    runningPort = 0;
    _port;
    _server;
    _instance;
    constructor(port) {
        this._port = port;
        this._server = express();
    }
    init(dir) {
        this._server.use(express.static(dir, { dotfiles: "allow" }));
        this._server.get("*", (_req, res) => res.sendFile(path.join(dir, "index.html")));
        return new Promise(resolve => {
            this._instance = this._server.listen(this._port, () => {
                this.runningPort = (this._instance?.address()).port;
                resolve();
            });
        });
    }
    async destroy() {
        return new Promise(resolve => {
            this._instance?.close(() => resolve());
        });
    }
}
