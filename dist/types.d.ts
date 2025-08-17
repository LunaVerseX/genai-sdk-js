export interface Message {
    role: "user" | "assistant" | "system";
    content: string;
}
export interface ChatOptions {
    model: string;
    temperature?: number;
    max_tokens?: number;
    reasoning?: {
        effort?: "low" | "medium" | "high";
        [key: string]: any;
    };
}
export interface ChatChoice {
    message: Message;
    reasoning?: Record<string, any>;
}
export interface Usage {
    input: number;
    output: number;
    system: number;
}
export interface ChatResponse {
    model: string;
    provider: string;
    choices: ChatChoice[];
    usage: Usage;
}
export type StreamDelta = {
    type: "delta";
    content?: string;
    reasoning?: Record<string, any>;
} | {
    type: "end";
    usage?: Usage;
};
