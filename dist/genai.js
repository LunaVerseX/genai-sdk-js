import { init, getConfig } from "./config";
import { listModels } from "./models";
import { chat } from "./chat";
import { tokens } from "./tokens";
import { chatStream } from "./chatStream";
export const genai = {
    init,
    getConfig,
    listModels,
    chat,
    tokens,
    chatStream
};
