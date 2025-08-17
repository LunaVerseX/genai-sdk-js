import { getConfig } from "./config";
import { cleanText, isValidModel, supportsReasoning } from "./utils";
export async function chat(messages, opts) {
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
            stream: false
        }),
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Chat falló: ${res.status} ${errorText}`);
    }
    try {
        const raw = await res.json();
        return {
            model: raw.model || opts.model,
            provider: raw.provider || "LunaVerseX Cloud",
            choices: raw.choices.map((c) => ({
                message: {
                    role: c.message.role,
                    content: cleanText(c.message.content),
                },
                reasoning: c.message.reasoning || c.reasoning || undefined,
            })),
            usage: {
                input: raw.usage?.prompt_tokens || 0,
                output: raw.usage?.completion_tokens || 0,
                system: raw.usage?.system_tokens || 0,
            },
        };
    }
    catch (parseError) {
        throw new Error(`Error parseando respuesta: ${parseError instanceof Error ? parseError.message : 'Error desconocido'}`);
    }
}
