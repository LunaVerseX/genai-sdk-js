import { getConfig } from "./config";
export async function listModels() {
    const { apiKey, apiBase } = getConfig();
    try {
        const res = await fetch(`${apiBase}/models`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error obteniendo modelos: ${res.status} ${errorText}`);
        }
        const data = await res.json();
        return data;
    }
    catch (error) {
        throw new Error(`Error listando modelos: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
}
