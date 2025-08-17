import { getConfig } from "./config";
import { cleanText, isValidModel, supportsReasoning } from "./utils";
export async function* chatStream(messages, opts) {
    const { apiKey, apiBase } = getConfig();
    if (!(await isValidModel(opts.model))) {
        throw new Error(`Invalid Model: ${opts.model}, usa genai.listModels() para más información.`);
    }
    if (opts.reasoning && !(await supportsReasoning(opts.model))) {
        console.warn(`Warning: El modelo ${opts.model} no soporta reasoning forzado. El parámetro reasoning será ignorado.`);
        delete opts.reasoning;
    }
    const res = await fetch(`${apiBase}/chat/v1`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            messages,
            ...opts,
            stream: true
        }),
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`ChatStream falló: ${res.status} ${errorText}`);
    }
    if (!res.body) {
        throw new Error("No se recibió body de respuesta para streaming");
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let finalUsage = undefined;
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || "";
            for (const line of lines) {
                const trimmedLine = line.trim();
                if (!trimmedLine ||
                    trimmedLine.startsWith(':') ||
                    trimmedLine.includes('OPENROUTER PROCESSING')) {
                    continue;
                }
                if (trimmedLine.startsWith("data: ")) {
                    const data = trimmedLine.slice(6).trim();
                    if (data === "[DONE]") {
                        yield { type: "end", usage: finalUsage };
                        return;
                    }
                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.usage) {
                            finalUsage = {
                                input: parsed.usage.prompt_tokens || 0,
                                output: parsed.usage.completion_tokens || 0,
                                system: parsed.usage.system_tokens || 0,
                            };
                        }
                        if (parsed.choices && parsed.choices.length > 0) {
                            const choice = parsed.choices[0];
                            if (choice.delta) {
                                const hasContent = choice.delta.content;
                                const hasReasoning = choice.delta.reasoning;
                                if (hasContent || hasReasoning) {
                                    yield {
                                        type: "delta",
                                        content: hasContent ? cleanText(choice.delta.content) : undefined,
                                        reasoning: hasReasoning || undefined,
                                    };
                                }
                            }
                            if (choice.finish_reason) {
                                yield { type: "end", usage: finalUsage };
                                return;
                            }
                        }
                    }
                    catch (parseError) {
                        continue;
                    }
                }
            }
        }
    }
    finally {
        reader.releaseLock();
    }
    yield { type: "end", usage: finalUsage };
}
