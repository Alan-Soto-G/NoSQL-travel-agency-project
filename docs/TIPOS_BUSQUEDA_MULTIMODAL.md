# 🔍 Tipos de Búsqueda Multimodal en el Sistema RAG

## Resumen de Casos de Prueba Implementados

Este documento explica los **5 tipos de búsqueda** que implementa nuestro sistema RAG multimodal, cubriendo todas las combinaciones posibles de entrada/salida.

---

## 📊 Matriz de Tipos de Búsqueda

| Caso | Entrada       | Proceso                      | Salida              | Endpoint         | Multimodal? |
| ---- | ------------- | ---------------------------- | ------------------- | ---------------- | ----------- |
| 1    | Texto         | Vector Search + LLM          | Texto + Imágenes    | POST /query      | ✅ Sí       |
| 2    | Texto + Filtros | Vector Search + Filtros + LLM | Texto + Imágenes    | POST /query      | ✅ Sí       |
| 3    | Imagen        | Vector Search (embedding)    | Imágenes similares  | GET /similar/:id | ✅ Sí       |
| 4    | Texto         | Vector Search + LLM complejo | Texto enriquecido   | POST /query      | ✅ Sí       |
| 5    | Texto         | Vector Search (sin LLM)      | Solo imágenes       | GET /search      | ✅ Sí       |

---

## 🎯 Caso 1: Búsqueda Semántica (TEXTO → TEXTO + IMÁGENES)

### Descripción

RAG completo: el usuario hace una pregunta en lenguaje natural y recibe una respuesta generada por el LLM + las imágenes relevantes.

### Flujo

```
1. Usuario ingresa query: "destinos paradisíacos para luna de miel"
2. CLIP genera embedding del texto [512 dims]
3. MongoDB Vector Search retorna top 5 imágenes similares
4. Sistema construye contexto con metadatos de imágenes
5. Groq LLM genera respuesta usando el contexto
6. API retorna: { answer: "...", results: [...] }
```

### Código de Prueba

```javascript
const response = await axios.post(`${API_BASE_URL}/query`, {
  query: "destinos paradisíacos para luna de miel con playas de arena blanca",
  k: 5,
  includeAnswer: true,
});
```

### Por qué es Multimodal

- **Entrada:** Texto natural
- **Procesamiento:** Embedding vectorial que entiende semántica
- **Recuperación:** Imágenes visualmente relacionadas (no solo keywords)
- **Salida:** Texto generado + imágenes

---

## 🔧 Caso 2: Filtros Híbridos (TEXTO + METADATOS → TEXTO)

### Descripción

Combina búsqueda vectorial semántica con filtros estructurados tradicionales (categorías, tags).

### Flujo

```
1. Usuario: "hoteles de lujo con vista al mar" + category="hotel" + tags=["lujo"]
2. CLIP genera embedding del texto
3. MongoDB Vector Search + filtros estructurados
4. Solo retorna imágenes que cumplan AMBOS criterios:
   - Similitud vectorial alta
   - Coincidencia exacta de metadatos
5. LLM genera respuesta basada en resultados filtrados
```

### Código de Prueba

```javascript
const response = await axios.post(`${API_BASE_URL}/query`, {
  query: "hoteles de lujo con vista al mar",
  category: "hotel",
  tags: ["lujo", "cinco-estrellas"],
  k: 5,
  includeAnswer: true,
});
```

### Por qué es Multimodal

- Combina **búsqueda semántica** (entiende "lujo" conceptualmente)
- Con **filtros tradicionales** (category = "hotel" exactamente)
- El resultado es más preciso que usar solo uno de los métodos

---

## 🖼️ Caso 3: Similitud Visual (IMAGEN → IMÁGENES)

### Descripción

Búsqueda pura de similitud visual: dada una imagen, encuentra imágenes visualmente similares.

### Flujo

```
1. Usuario proporciona ID de imagen existente
2. Sistema recupera embedding de esa imagen (512 floats)
3. MongoDB Vector Search encuentra imágenes con embeddings similares
4. Retorna top K imágenes más parecidas visualmente
5. NO usa LLM (es búsqueda vectorial pura)
```

### Código de Prueba

```javascript
const response = await axios.get(
  `${API_BASE_URL}/similar/674e123abc456def789`,
  {
    params: { k: 5 },
  }
);
```

### Por qué es Multimodal

- **Entrada:** Imagen (embedding visual)
- **Procesamiento:** Comparación de vectores en espacio CLIP
- **Salida:** Imágenes (no texto)
- Es **multimodal** porque usa embeddings que CLIP generó aprendiendo de pares texto-imagen

---

## 🧠 Caso 4: RAG Complejo (TEXTO → IMÁGENES → TEXTO enriquecido)

### Descripción

Pipeline completo RAG: pregunta compleja que requiere sintetizar información de múltiples fuentes visuales.

### Flujo

```
1. Usuario hace pregunta compleja: "¿Cuáles son las mejores opciones para un viaje romántico?"
2. CLIP genera embedding de la pregunta
3. Vector Search recupera TOP 10 imágenes relevantes (más contexto)
4. Sistema construye prompt detallado con:
   - Títulos de imágenes
   - Categorías
   - Descripciones (captions)
   - Tags
5. LLM analiza TODO el contexto y genera respuesta coherente
6. Retorna respuesta + evidencias (imágenes usadas)
```

### Código de Prueba

```javascript
const response = await axios.post(`${API_BASE_URL}/query`, {
  query:
    "¿Cuáles son las mejores opciones para un viaje romántico en pareja? Dame recomendaciones específicas",
  k: 10, // Más contexto para el LLM
  includeAnswer: true,
});
```

### Por qué es Multimodal

- **Entrada:** Pregunta en lenguaje natural
- **Recuperación:** Imágenes + metadatos (multimodal)
- **Síntesis:** LLM integra información visual y textual
- **Salida:** Respuesta que referencia contenido visual

---

## 🔄 Caso 5: Cross-Modal (TEXTO → IMÁGENES puras)

### Descripción

Búsqueda cross-modal directa: texto busca imágenes visualmente relacionadas SIN generar respuesta de texto.

### Flujo

```
1. Usuario describe visualmente lo que busca: "paisajes montañosos con nieve"
2. CLIP genera embedding del TEXTO
3. MongoDB Vector Search compara ese embedding con embeddings de IMÁGENES
4. Retorna imágenes que "se parecen" visualmente a la descripción
5. NO genera texto (solo retorna imágenes + scores)
```

### Código de Prueba

```javascript
const response = await axios.get(`${API_BASE_URL}/search`, {
  params: {
    query: "paisajes montañosos con nieve y lagos cristalinos",
    k: 5,
  },
});
```

### Por qué es Multimodal

- **La magia de CLIP:** El embedding de "paisajes montañosos" está en el **MISMO espacio vectorial** que el embedding de una foto real de montañas
- Texto e imagen son comparables directamente
- Es **cross-modal puro**: entrada texto, salida imágenes, sin keywords

---

## 🔬 Diferencias Clave

### Caso 1 vs Caso 5

| Aspecto        | Caso 1 (RAG)                | Caso 5 (Cross-modal)         |
| -------------- | --------------------------- | ---------------------------- |
| Endpoint       | POST /query                 | GET /search                  |
| LLM            | ✅ Sí (genera respuesta)    | ❌ No                        |
| Salida         | Texto + Imágenes            | Solo Imágenes                |
| Use Case       | Responder preguntas         | Encontrar contenido visual   |
| Tiempo         | Más lento (LLM añade delay) | Más rápido (solo embedding)  |

### Caso 3 vs Caso 5

| Aspecto | Caso 3 (Imagen→Imagen)       | Caso 5 (Texto→Imagen)                |
| ------- | ---------------------------- | ------------------------------------ |
| Entrada | ID de imagen existente       | Descripción textual                  |
| Proceso | Compara embeddings guardados | Genera embedding nuevo del texto     |
| Uso     | "Más como esta"              | "Buscar imágenes de X"               |

---

## 📈 Métricas Relevantes por Tipo

### Para Casos con LLM (1, 2, 4)

- Tiempo de respuesta total
- Tiempo de vector search
- Tiempo de generación LLM
- Calidad de respuesta (subjetiva)
- Relevancia de contexto recuperado

### Para Casos sin LLM (3, 5)

- Tiempo de respuesta (solo embedding + vector search)
- Precisión de similitud (score cosine)
- Recall (¿encontró lo esperado?)

---

## 🎓 Conceptos Clave

### ¿Qué hace "multimodal" a CLIP?

CLIP fue entrenado con **400 millones de pares (imagen, texto)** de internet. Aprendió a:

1. **Codificar imágenes** → vector de 512 dimensiones
2. **Codificar textos** → vector de 512 dimensiones (mismo espacio!)
3. **Maximizar similitud** entre pares correctos
4. **Minimizar similitud** entre pares incorrectos

**Resultado:** Un texto como "gato naranja" tiene un embedding MUY similar al embedding de una foto real de un gato naranja.

### ¿Por qué Vector Search?

Búsqueda tradicional (SQL LIKE):

```sql
SELECT * FROM images WHERE caption LIKE '%playa%'
```

- Solo encuentra coincidencias exactas de palabras
- "playa" ≠ "costa" ≠ "litoral" (aunque son lo mismo)

Vector Search:

```javascript
db.media.aggregate([
  {
    $vectorSearch: {
      queryVector: embedding_de("playa"),
      // Este embedding también es similar a "costa", "arena", "mar"
    },
  },
]);
```

- Encuentra **conceptos similares** aunque usen palabras diferentes
- Entiende sinonimos, contexto, relaciones semánticas

---

## 🚀 Resumen para tu Informe

**Nuestro sistema cubre TODOS los tipos de búsqueda multimodal:**

1. ✅ **Texto → Texto + Imágenes** (RAG clásico)
2. ✅ **Texto + Filtros → Texto** (Híbrido semántico/estructurado)
3. ✅ **Imagen → Imágenes** (Similitud visual)
4. ✅ **Texto → Imágenes → Texto** (RAG complejo)
5. ✅ **Texto → Imágenes** (Cross-modal puro)

**Esto satisface completamente el requisito del PDF:**

> "Casos de uso texto-texto, imagen-imagen, multimodal"

---

## 📝 Próximos Pasos

1. ✅ Crear índice vectorial en MongoDB Atlas
2. ✅ Ejecutar `npm run test-cases`
3. ✅ Capturar screenshots de cada caso
4. ✅ Documentar métricas reales en INFORME_FINAL.md
5. ✅ Explicar diferencias entre tipos de búsqueda

---

**Autor:** Sistema RAG Multimodal - Universidad de Caldas 2025-2
