const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

/**
 * Genera una respuesta usando Groq LLM con contexto de RAG
 */
async function generateAnswerWithContext(context, question, options = {}) {
  try {
    const {
      model = "llama-3.1-8b-instant",
      temperature = 0.4,
      maxTokens = 512,
    } = options;

    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY no configurada en variables de entorno");
    }

    const systemPrompt = `Eres un asistente experto en turismo y viajes, especializado en proporcionar información sobre hoteles, actividades turísticas, destinos y servicios de viaje.

Tu rol es ayudar a los clientes a tomar decisiones informadas sobre sus viajes, basándote ÚNICAMENTE en el contexto proporcionado.

Instrucciones:
- Responde de forma clara, amable y profesional
- Usa el contexto proporcionado como tu única fuente de información
- Si el contexto no contiene información suficiente para responder, indícalo explícitamente
- Proporciona recomendaciones útiles y prácticas
- Estructura tus respuestas con viñetas o listas cuando sea apropiado
- Mantén un tono entusiasta pero profesional sobre viajes y turismo`;

    const userPrompt = `[CONTEXTO RECUPERADO]
${context}

[PREGUNTA DEL CLIENTE]
${question}

[INSTRUCCIONES PARA TU RESPUESTA]
Basándote únicamente en el contexto anterior:
1. Responde la pregunta de manera completa y útil
2. Si el contexto menciona múltiples opciones, compáralas brevemente
3. Incluye detalles relevantes que puedan ayudar en la decisión
4. Si algo no está en el contexto, menciona que no tienes esa información específica

Responde ahora:`;

    const response = await axios.post(
      GROQ_API_URL,
      {
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature,
        max_tokens: maxTokens,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    if (error.response) {
      console.error("Error de API Groq:", error.response.data);
      throw new Error(
        `Error de Groq API: ${
          error.response.data.error?.message || "Error desconocido"
        }`
      );
    } else if (error.code === "ECONNREFUSED") {
      throw new Error("No se pudo conectar con Groq API");
    }
    throw error;
  }
}

/**
 * Construye contexto textual desde resultados de búsqueda
 */
function buildContextFromResults(results, maxItems = 6) {
  if (!results || results.length === 0) {
    return "No se encontraron resultados relevantes.";
  }

  const contextLines = results.slice(0, maxItems).map((result, index) => {
    const parts = [
      `[RESULTADO ${index + 1}]`,
      `Título: ${result.title}`,
      `Categoría: ${result.category}`,
    ];

    if (result.tags && result.tags.length > 0) {
      parts.push(`Etiquetas: ${result.tags.join(", ")}`);
    }

    if (result.caption) {
      parts.push(`Descripción: ${result.caption}`);
    }

    if (result.score !== undefined) {
      parts.push(`Relevancia: ${(result.score * 100).toFixed(1)}%`);
    }

    return parts.join("\n");
  });

  return contextLines.join("\n\n");
}

/**
 * Genera respuesta completa de RAG (búsqueda + LLM)
 */
async function generateRAGResponse(searchResults, question, options = {}) {
  try {
    // Construir contexto desde resultados
    const context = buildContextFromResults(
      searchResults,
      options.maxContext || 6
    );

    // Generar respuesta con LLM
    const answer = await generateAnswerWithContext(context, question, options);

    return {
      answer,
      context,
      resultsUsed: Math.min(searchResults.length, options.maxContext || 6),
      totalResults: searchResults.length,
    };
  } catch (error) {
    console.error("Error generando respuesta RAG:", error);
    throw error;
  }
}

/**
 * Genera un resumen de múltiples resultados
 */
async function summarizeResults(results, focusArea = null) {
  try {
    const context = buildContextFromResults(results, 10);

    const question = focusArea
      ? `Resume estos resultados enfocándote en: ${focusArea}`
      : "Proporciona un resumen general de estos resultados, destacando las opciones más relevantes y sus características principales";

    const summary = await generateAnswerWithContext(context, question, {
      temperature: 0.3,
      maxTokens: 300,
    });

    return summary;
  } catch (error) {
    console.error("Error generando resumen:", error);
    throw error;
  }
}

module.exports = {
  generateAnswerWithContext,
  buildContextFromResults,
  generateRAGResponse,
  summarizeResults,
};
