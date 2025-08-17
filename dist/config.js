let config = null;
export function init(cfg) {
    if (!cfg.apiKey)
        throw new Error("API Key es requerida");
    config = {
        apiKey: cfg.apiKey,
        userId: cfg.userId,
        apiBase: cfg.apiBase || "https://api.lunaversex.com",
    };
}
export function getConfig() {
    if (!config)
        throw new Error("SDK no inicializado. Usa genai.init()");
    return config;
}
export function resetConfig() {
    config = null;
}
