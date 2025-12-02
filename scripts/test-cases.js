require("dotenv").config();
const axios = require("axios");

/**
 * Script para ejecutar los 4 casos de prueba obligatorios
 * Genera evidencias y métricas de rendimiento
 */

const API_BASE_URL =
  process.env.API_BASE_URL || "http://localhost:3000/api/rag";

// Colores para consola
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

/**
 * Medir tiempo de respuesta
 */
function measureTime(startTime) {
  const endTime = Date.now();
  return endTime - startTime;
}

/**
 * Formatear resultados para display
 */
function displayResults(testNumber, testName, query, results, responseTime) {
  console.log("\n" + "=".repeat(80));
  console.log(
    `${colors.bright}${colors.blue}CASO DE PRUEBA ${testNumber}: ${testName}${colors.reset}`
  );
  console.log("=".repeat(80));
  console.log(`${colors.cyan}📝 Query:${colors.reset} ${query}`);
  console.log(
    `${colors.cyan}⏱️  Tiempo de respuesta:${colors.reset} ${responseTime}ms`
  );
  console.log(
    `${colors.cyan}📊 Resultados encontrados:${colors.reset} ${
      results.totalResults || 0
    }`
  );

  if (results.results && results.results.length > 0) {
    console.log(
      `\n${colors.yellow}🔍 Top ${Math.min(
        3,
        results.results.length
      )} resultados:${colors.reset}`
    );
    results.results.slice(0, 3).forEach((result, idx) => {
      console.log(
        `\n  ${idx + 1}. ${colors.bright}${result.title}${colors.reset}`
      );
      console.log(`     📂 Categoría: ${result.category}`);
      console.log(`     🏷️  Tags: ${result.tags?.join(", ") || "N/A"}`);
      console.log(`     📈 Score: ${result.score?.toFixed(4) || "N/A"}`);
      console.log(`     💬 ${result.caption}`);
    });
  }

  if (results.answer) {
    console.log(`\n${colors.green}🤖 Respuesta del LLM:${colors.reset}`);
    console.log(`${results.answer}\n`);
  }

  console.log("=".repeat(80) + "\n");
}

/**
 * CASO 1: Búsqueda Semántica Simple
 */
async function testCase1() {
  const query =
    "destinos paradisíacos para luna de miel con playas de arena blanca";

  const startTime = Date.now();
  const response = await axios.post(`${API_BASE_URL}/query`, {
    query,
    k: 5,
    includeAnswer: true,
  });
  const responseTime = measureTime(startTime);

  displayResults(1, "Búsqueda Semántica", query, response.data, responseTime);

  return { query, responseTime, results: response.data };
}

/**
 * CASO 2: Filtros Híbridos
 */
async function testCase2() {
  const query = "hoteles de lujo con vista al mar";

  const startTime = Date.now();
  const response = await axios.post(`${API_BASE_URL}/query`, {
    query,
    category: "hoteles",
    tags: ["lujo", "cinco-estrellas"],
    k: 5,
    includeAnswer: true,
  });
  const responseTime = measureTime(startTime);

  displayResults(
    2,
    "Filtros Híbridos (Categoría + Tags)",
    `${query} [Filtros: category=hoteles, tags=lujo,cinco-estrellas]`,
    response.data,
    responseTime
  );

  return { query, responseTime, results: response.data };
}

/**
 * CASO 3: Búsqueda Multimodal (Imagen similar)
 */
async function testCase3() {
  console.log("\n" + "=".repeat(80));
  console.log(
    `${colors.bright}${colors.blue}CASO DE PRUEBA 3: Búsqueda Multimodal (Imagen Similares)${colors.reset}`
  );
  console.log("=".repeat(80));

  // Primero obtener una imagen de referencia
  const listResponse = await axios.get(`${API_BASE_URL}/images`, {
    params: { limit: 1, category: "destinos" },
  });

  if (
    !listResponse.data.documents ||
    listResponse.data.documents.length === 0
  ) {
    console.log('⚠️  No hay imágenes en la categoría "destinos" para probar');
    return null;
  }

  const referenceImage = listResponse.data.documents[0];
  console.log(
    `${colors.cyan}🖼️  Imagen de referencia:${colors.reset} ${referenceImage.title}`
  );
  console.log(`${colors.cyan}📂 ID:${colors.reset} ${referenceImage._id}`);

  const startTime = Date.now();
  const response = await axios.get(
    `${API_BASE_URL}/similar/${referenceImage._id}`,
    {
      params: { k: 5 },
    }
  );
  const responseTime = measureTime(startTime);

  console.log(
    `${colors.cyan}⏱️  Tiempo de respuesta:${colors.reset} ${responseTime}ms`
  );
  console.log(
    `${colors.cyan}📊 Imágenes similares encontradas:${colors.reset} ${
      response.data.totalResults || 0
    }`
  );

  if (response.data.results && response.data.results.length > 0) {
    console.log(
      `\n${colors.yellow}🔍 Top ${Math.min(
        3,
        response.data.results.length
      )} imágenes similares:${colors.reset}`
    );
    response.data.results.slice(0, 3).forEach((result, idx) => {
      console.log(
        `\n  ${idx + 1}. ${colors.bright}${result.title}${colors.reset}`
      );
      console.log(`     📈 Similitud: ${result.score?.toFixed(4) || "N/A"}`);
      console.log(`     📂 Categoría: ${result.category}`);
      console.log(`     💬 ${result.caption}`);
    });
  }

  console.log("=".repeat(80) + "\n");

  return {
    query: `Similares a: ${referenceImage.title}`,
    responseTime,
    results: response.data,
  };
}

/**
 * CASO 4: RAG Complejo con LLM
 */
async function testCase4() {
  const query =
    "¿Cuáles son las mejores opciones para un viaje romántico en pareja? Dame recomendaciones específicas de destinos, hoteles y actividades";

  const startTime = Date.now();
  const response = await axios.post(`${API_BASE_URL}/query`, {
    query,
    k: 10,
    includeAnswer: true,
  });
  const responseTime = measureTime(startTime);

  displayResults(4, "RAG Complejo con LLM", query, response.data, responseTime);

  return { query, responseTime, results: response.data };
}

/**
 * CASO ADICIONAL: Búsqueda por actividades de aventura
 */
async function testCase5() {
  const query = "actividades extremas y deportes acuáticos emocionantes";

  const startTime = Date.now();
  const response = await axios.post(`${API_BASE_URL}/query`, {
    query,
    category: "actividades",
    k: 5,
    includeAnswer: true,
  });
  const responseTime = measureTime(startTime);

  displayResults(
    5,
    "Búsqueda de Actividades (Adicional)",
    query,
    response.data,
    responseTime
  );

  return { query, responseTime, results: response.data };
}

/**
 * Generar reporte de métricas
 */
function generateMetricsReport(results) {
  console.log("\n" + "█".repeat(80));
  console.log(
    `${colors.bright}${colors.green}📊 REPORTE DE MÉTRICAS DE RENDIMIENTO${colors.reset}`
  );
  console.log("█".repeat(80) + "\n");

  const responseTimes = results.map((r) => r.responseTime);
  const avgTime =
    responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
  const minTime = Math.min(...responseTimes);
  const maxTime = Math.max(...responseTimes);

  console.log(
    `${colors.cyan}⏱️  Tiempo de respuesta promedio:${
      colors.reset
    } ${avgTime.toFixed(2)}ms`
  );
  console.log(
    `${colors.cyan}⚡ Tiempo de respuesta mínimo:${colors.reset} ${minTime}ms`
  );
  console.log(
    `${colors.cyan}🐌 Tiempo de respuesta máximo:${colors.reset} ${maxTime}ms`
  );

  const totalResults = results.reduce(
    (sum, r) => sum + (r.results?.totalResults || 0),
    0
  );
  console.log(
    `${colors.cyan}📊 Total de resultados encontrados:${colors.reset} ${totalResults}`
  );
  console.log(
    `${colors.cyan}📈 Promedio de resultados por query:${colors.reset} ${(
      totalResults / results.length
    ).toFixed(2)}`
  );

  const precision =
    results.filter((r) => r.results?.totalResults > 0).length / results.length;
  console.log(
    `${colors.cyan}🎯 Precisión (queries con resultados):${colors.reset} ${(
      precision * 100
    ).toFixed(1)}%`
  );

  console.log("\n" + "█".repeat(80) + "\n");
}

/**
 * Script principal
 */
async function main() {
  console.log(
    `\n${colors.bright}${colors.blue}🧪 EJECUTANDO CASOS DE PRUEBA OBLIGATORIOS${colors.reset}\n`
  );

  const results = [];

  try {
    // Verificar que el servidor esté corriendo
    console.log("🔍 Verificando conexión con API...");
    await axios.get(`${API_BASE_URL}/images?limit=1`);
    console.log(
      `${colors.green}✅ API disponible en ${API_BASE_URL}${colors.reset}\n`
    );

    // Ejecutar casos de prueba
    console.log("🚀 Iniciando casos de prueba...\n");

    const result1 = await testCase1();
    results.push(result1);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Pausa entre tests

    const result2 = await testCase2();
    results.push(result2);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result3 = await testCase3();
    if (result3) results.push(result3);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result4 = await testCase4();
    results.push(result4);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result5 = await testCase5();
    results.push(result5);

    // Generar reporte
    generateMetricsReport(results);

    console.log(
      `${colors.green}✅ Todos los casos de prueba completados exitosamente${colors.reset}\n`
    );
  } catch (error) {
    console.error(
      `\n${colors.bright}❌ Error ejecutando casos de prueba:${colors.reset}`
    );
    console.error(error.response?.data || error.message);
    console.error("\n💡 Asegúrate de que:");
    console.error("   1. El servidor Node.js esté corriendo (npm start)");
    console.error(
      "   2. El servicio Python CLIP esté activo (python clip_service.py)"
    );
    console.error("   3. MongoDB Atlas esté configurado correctamente");
    console.error(
      "   4. Hayas cargado imágenes de ejemplo (npm run load-samples)\n"
    );
    process.exit(1);
  }
}

// Ejecutar
if (require.main === module) {
  main().catch((error) => {
    console.error("💥 Error fatal:", error);
    process.exit(1);
  });
}

module.exports = { testCase1, testCase2, testCase3, testCase4, testCase5 };
