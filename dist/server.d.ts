export default class Server {
    runningPort: number;
    private readonly _port;
    private readonly _server;
    private _instance?;
    constructor(port: number);
    init(dir: string): Promise<void>;
    destroy(): Promise<void>;
}
