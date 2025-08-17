export interface Model {
    id: string;
    name: string;
    supportsReasoning: boolean;
}
export interface ModelsResponse {
    models: Model[];
    plan: string;
    limits: {
        requests: number;
        window: number;
        maxTokensPerRequest: number;
    };
}
export declare function listModels(): Promise<ModelsResponse>;
