interface Config {
    apiKey: string;
    userId?: string;
    apiBase: string;
}
export declare function init(cfg: Partial<Config>): void;
export declare function getConfig(): Config;
export declare function resetConfig(): void;
export {};
