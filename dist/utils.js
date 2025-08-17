import { getConfig } from "./config";
export function cleanText(input) {
    if (!input || typeof input !== 'string')
        return '';
    return input
        .replace(/::OPENROUTER PROCESSING/g, "")
        .replace(/: OPENROUTER PROCESSING/g, "")
        .trim();
}
let cachedModels = null;
let cachedReasoningModels = null;
async function getAvailableModels() {
    if (cachedModels && cachedReasoningModels) {
        return {
            models: cachedModels,
            reasoningModels: cachedReasoningModels
        };
    }
    try {
        const { apiKey, apiBase } = getConfig();
        const res = await fetch(`${apiBase}/models`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
        });
        if (res.ok) {
            const data = await res.json();
            cachedModels = data.models.map((m) => m.id);
            cachedReasoningModels = data.models
                .filter((m) => m.supportsReasoning)
                .map((m) => m.id);
            setTimeout(() => {
                cachedModels = null;
                cachedReasoningModels = null;
            }, 300000);
            return {
                models: cachedModels ?? [],
                reasoningModels: cachedReasoningModels ?? [],
            };
        }
    }
    catch (error) {
        console.warn('Error obteniendo modelos dinámicamente:', error);
    }
    const fallbackModels = [
        "lumi-o1-mini",
        "lumi-o1",
        "lumi-o1-pro"
    ];
    const fallbackReasoningModels = [
        "lumi-o1-mini"
    ];
    return {
        models: fallbackModels,
        reasoningModels: fallbackReasoningModels
    };
}
export async function isValidModel(model) {
    const { models } = await getAvailableModels();
    return models.includes(model);
}
export async function supportsReasoning(model) {
    const { reasoningModels } = await getAvailableModels();
    return reasoningModels.includes(model);
}
