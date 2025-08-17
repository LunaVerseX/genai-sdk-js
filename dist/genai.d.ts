import { init, getConfig } from "./config";
import { listModels } from "./models";
import { chat } from "./chat";
import { tokens } from "./tokens";
import { chatStream } from "./chatStream";
export declare const genai: {
    init: typeof init;
    getConfig: typeof getConfig;
    listModels: typeof listModels;
    chat: typeof chat;
    tokens: typeof tokens;
    chatStream: typeof chatStream;
};
