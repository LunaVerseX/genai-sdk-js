# @lunaversex/genai

![NPM Version](https://img.shields.io/npm/v/@lunaversex/genai)
![License](https://img.shields.io/npm/l/@lunaversex/genai)
![Node.js Version](https://img.shields.io/node/v/@lunaversex/genai)
![Build Status](https://img.shields.io/github/actions/workflow/status/lunaversex/genai-sdk-js/ci.yml?branch=main)

**LunaVerseX Generative AI SDK for JavaScript**

SDK oficial de **LunaVerseX** para integrar capacidades de **IA generativa** en aplicaciones Node.js y frontend.
Provee interfaces simples para chat, streaming, manejo de modelos y utilidades relacionadas.

📚 Documentación completa: [docs.lunaversex.com/sdks/genai](https://docs.lunaversex.com/sdks/genai)

---

## 🚀 Instalación

```bash
npm install @lunaversex/genai
```

o con **yarn**:

```bash
yarn add @lunaversex/genai
```

---

## ✨ Características

* 🔹 **Chat conversacional** con soporte para múltiples modelos.
* 🔹 **Streaming de respuestas** para baja latencia.
* 🔹 **Gestión de modelos disponibles**.
* 🔹 **Utilidades para manejo de tokens y configuración**.
* 🔹 **Escrito en TypeScript** con tipados incluidos.

---

## 🧪 Modelos disponibles

| Modelo       | ID           | Soporta Reasoning | Descripción                                     |
| ------------ | ------------ | ---------------- | ----------------------------------------------- |
| Lumi o1 Mini | lumi-o1-mini | ✅ Sí             | Modelo compacto para tareas generales.          |
| Lumi o1      | lumi-o1      | ❌ No             | Modelo equilibrado para uso general.           |
| Lumi o1 Pro  | lumi-o1-pro  | ❌ No             | El modelo más creativo y sentimental.          |
| Lumi o1 High | lumi-o1-high | ✅ Sí             | Razonamiento profundo y rápido, código, matemáticas. |
| Lumi o3      | lumi-o3      | ✅ Sí (Nativo)    | El modelo más avanzado de LunaVerseX.          |

---

## 🧩 Endpoints del SDK

| Método         | Descripción                                                     |
| -------------- | --------------------------------------------------------------- |
| `chat()`       | Envía un mensaje al modelo y recibe una respuesta.              |
| `chatStream()` | Envía un mensaje al modelo y recibe una respuesta en streaming. |
| `listModels()` | Lista los modelos disponibles y sus características.            |
| `setConfig()`  | Configura globalmente la clave API y la URL base del SDK.       |

---

## 🔧 Uso básico

### Configuración global

```ts
import { genai } from "@lunaversex/genai";

genai.init({ 
  apiKey: "your-api-key"
});
```

### Chat básico

```ts
import { genai } from '@lunaversex/genai';
// import { chatStream, tokens, chat, listModels } from '@lunaversex/genai';
// Cooming Soon

console.log("\n=== Prueba chat ===");
try {
const res = await genai.chat(
[{ role: "user", content: "Hola" }],
{ model: "lumi-o1" }
);
console.log("Respuesta:", res.choices[0].message.content);
} catch (error) {
console.error("Error:", error);
}

```

### Streaming de chat

```ts
import { genAI } from '@lunaversex/genai';

// import { chatStream, tokens, chat, listModels } from '@lunaversex/genai';
// Cooming Soon

async function run() {
  console.log("\n=== Prueba streaming ===");

  try {
    let fullContent = "";

    for await (const delta of genAI.chatStream(
      [{ role: "user", content: "Cuéntame una historia muy corta" }],
      { model: "lumi-o1-mini" }
    )) {
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
  } catch (error) {
    console.error("Error en streaming:", error);
  }
}
```

---

## 📄 Ejemplos adicionales

* Más ejemplos en la documentación oficial:
  👉 [docs.lunaversex.com/sdks/genai/examples](https://docs.lunaversex.com/sdks/genai/examples)

---

## 🔐 Seguridad

* **Nunca incluyas tu API Key directamente en el código fuente.**
* Usá variables de entorno (`process.env.LUNAVERSEX_API_KEY`).
* El SDK no guarda ni expone claves sensibles.

---

## 📜 Licencia

Este proyecto está bajo licencia [Apache-2.0](LICENSE).

---

## 🧑‍💻 Autor

Desarrollado por **[LunaVerseX](https://www.lunaversex.com)**.
Mantenido por [Joaco Heredia](https://github.com/joaco-heredia).

---

## 📈 Changelog

### v0.3.0 (2025-08-17)

* 🎉 Lanzamiento inicial del SDK.
* ✅ Implementación de métodos `chat()`, `chatStream()`, `listModels()`, `setConfig()`, `tokens()`.
* 📝 Documentación inicial con ejemplos de uso.



