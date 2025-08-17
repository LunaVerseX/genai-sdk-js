export function tokens(response) {
    if (!response?.usage)
        return { input: 0, output: 0, system: 0 };
    return {
        input: response.usage.prompt_tokens || 0,
        output: response.usage.completion_tokens || 0,
        system: response.usage.system_tokens || 0,
    };
}
