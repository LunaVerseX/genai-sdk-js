import { genai } from "./genai";
genai.init({
    apiKey: "your-api-key"
});
async function run() {
    console.log("=== Listando modelos disponibles ===");
    try {
        const modelsData = await genai.listModels();
        console.log("Plan:", modelsData.plan);
        console.log("Límites:", modelsData.limits);
        console.log("Modelos disponibles:");
        modelsData.models.forEach(model => {
            console.log(`- ${model.name} (${model.id}) - Reasoning: ${model.supportsReasoning}`);
        });
    }
    catch (error) {
        console.error("Error listando modelos:", error);
        return;
    }
    console.log("\n=== Prueba chat completo (con reasoning) ===");
    try {
        const res = await genai.chat([{ role: "user", content: "¿Cómo se llama tu creador?" }], { model: "lumi-o1-mini", reasoning: { effort: "high" } });
        console.log("Modelo:", res.model);
        console.log("Provider:", res.provider);
        console.log("Mensaje:", res.choices[0].message.content);
        console.log("Razonamiento:", res.choices[0].reasoning);
        console.log("Uso:", res.usage);
    }
    catch (error) {
        console.error("Error en chat:", error);
    }
    console.log("\n=== Prueba chat con modelo sin reasoning ===");
    try {
        const res = await genai.chat([{ role: "user", content: "Hola" }], { model: "lumi-o1" });
        console.log("Respuesta:", res.choices[0].message.content);
    }
    catch (error) {
        console.error("Error:", error);
    }
    console.log("\n=== Prueba con modelo no disponible ===");
    try {
        const res = await genai.chat([{ role: "user", content: "Test" }], { model: "lumi-o3" });
        console.log("Respuesta:", res.choices[0].message.content);
    }
    catch (error) {
        console.error("Error esperado (modelo no disponible):", error.message);
    }
    console.log("\n=== Prueba streaming ===");
    try {
        let fullContent = "";
        for await (const delta of genai.chatStream([{ role: "user", content: "Cuéntame una historia muy corta" }], { model: "lumi-o1-mini" })) {
            if (delta.type === "delta") {
                if (delta.content) {
                    fullContent += delta.content;
                    process.stdout.write(delta.content);
                }
                if (delta.reasoning) {
                    console.log("\n[Razonamiento parcial]", delta.reasoning);
                }
            }
            if (delta.type === "end") {
                console.log("\n[Fin del stream]");
                if (delta.usage) {
                    console.log("Uso final:", delta.usage);
                }
            }
        }
        console.log(`\n\nContenido completo: ${fullContent.length} caracteres`);
    }
    catch (error) {
        console.error("Error en streaming:", error);
    }
}
run().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
});
