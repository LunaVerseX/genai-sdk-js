import { Message, ChatOptions, StreamDelta } from "./types";
export declare function chatStream(messages: Message[], opts: ChatOptions): AsyncGenerator<StreamDelta>;
