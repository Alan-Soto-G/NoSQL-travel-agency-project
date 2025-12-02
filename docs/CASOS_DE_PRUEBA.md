# 📋 Documentación de Casos de Prueba - Sistema RAG Multimodal

Este documento explica en detalle cómo funciona cada uno de los 5 casos de prueba del sistema RAG (Retrieval-Augmented Generation) con capacidades multimodales.

---

## 🎯 Visión General

El sistema implementa un pipeline RAG que combina:

- **CLIP** (openai/clip-vit-base-patch32): Modelo de embeddings multimodales de 512 dimensiones
- **MongoDB Atlas Vector Search**: Búsqueda de similitud coseno sobre embeddings
- **LLM (OpenAI GPT)**: Generación de respuestas contextualizadas

---

## 📊 CASO 1: Búsqueda Semántica Simple (TEXTO → TEXTO + IMÁGENES)

### 🎯 Objetivo

Evaluar la capacidad del sistema para entender lenguaje natural y generar respuestas contextualizadas usando RAG completo.

### 🔄 Flujo de Ejecución

```
Usuario escribe query
    ↓
1. Generar embedding de texto con CLIP
    ↓
2. Búsqueda vectorial en MongoDB (similitud coseno)
    ↓
3. Recuperar top-5 imágenes más relevantes
    ↓
4. Enviar contexto + query al LLM
    ↓
5. LLM genera respuesta personalizada
    ↓
Retorna: Imágenes + Respuesta en lenguaje natural
```

### 📝 Query de Ejemplo

```javascript
"destinos paradisíacos para luna de miel con playas de arena blanca";
```

### 🔧 Implementación Técnica

**Request:**

```javascript
POST /api/rag/query
{
  query: "destinos paradisíacos para luna de miel con playas de arena blanca",
  k: 5,
  includeAnswer: true
}
```

**Proceso Interno:**

1. **Embedding de texto**: CLIP convierte la query en vector de 512 dimensiones
2. **Vector Search**: MongoDB ejecuta búsqueda con operador `$vectorSearch`
3. **Contexto**: Se construye un prompt con metadatos de las imágenes recuperadas
4. **LLM**: OpenAI GPT genera respuesta usando el contexto
5. **Respuesta**: JSON con imágenes + respuesta textual

### 📤 Salida Esperada

- **Imágenes**: 5 destinos con playas tropicales (score > 0.85)
- **Respuesta LLM**: Texto descriptivo recomendando destinos específicos
- **Tiempo**: ~300-500ms (búsqueda) + ~1000-2000ms (LLM)

### 🎓 Conceptos Evaluados

- ✅ Comprensión semántica de lenguaje natural
- ✅ Búsqueda vectorial precisa
- ✅ Generación de texto contextualizado
- ✅ Pipeline RAG completo (Retrieve → Augment → Generate)

---

## 🔍 CASO 2: Filtros Híbridos (TEXTO + METADATOS → TEXTO)

### 🎯 Objetivo

Evaluar la combinación de búsqueda vectorial semántica con filtros estructurados tradicionales.

### 🔄 Flujo de Ejecución

```
Usuario: query + filtro de categoría
    ↓
1. Aplicar filtro de categoría (MongoDB query tradicional)
    ↓
2. Generar embedding del texto
    ↓
3. Búsqueda vectorial SOLO en documentos filtrados
    ↓
4. Recuperar top-5 resultados
    ↓
5. LLM genera respuesta con contexto filtrado
    ↓
Retorna: Resultados híbridos (vectorial + filtros)
```

### 📝 Query de Ejemplo

```javascript
"hoteles de lujo con vista al mar"
[Filtro: category=hotel]
```

### 🔧 Implementación Técnica

**Request:**

```javascript
POST /api/rag/query
{
  query: "hoteles de lujo con vista al mar",
  category: "hotel",  // Filtro estructurado
  k: 5,
  includeAnswer: true
}
```

**Proceso Interno:**

1. **Pre-filtro**: MongoDB aplica `{category: "hotel"}` antes de la búsqueda vectorial
2. **Vector Search con filtro**:
   ```javascript
   {
     $vectorSearch: {
       index: "vector_search_index",
       path: "image_embedding",
       queryVector: [...512 dimensions...],
       filter: { category: { $eq: "hotel" } },  // ← Filtro integrado
       numCandidates: 50,
       limit: 5
     }
   }
   ```
3. **Contexto**: Solo hoteles que coinciden semánticamente
4. **LLM**: Genera recomendaciones específicas de hoteles

### 📤 Salida Esperada

- **Imágenes**: Solo hoteles (category="hotel") que mencionan "lujo" o "vista al mar"
- **Precisión**: Mayor que búsqueda pura (reduce falsos positivos)
- **Tiempo**: ~350-450ms (filtro + búsqueda vectorial)

### 🎓 Conceptos Evaluados

- ✅ Búsqueda híbrida (semántica + estructurada)
- ✅ Filtros de metadatos en vector search
- ✅ Reducción de espacio de búsqueda
- ✅ Precisión mejorada con contexto específico

---

## 🖼️ CASO 3: Búsqueda Multimodal (IMAGEN → IMÁGENES)

### 🎯 Objetivo

Evaluar la capacidad de CLIP para comparar similitud visual pura entre embeddings de imágenes.

### 🔄 Flujo de Ejecución

```
Sistema obtiene imagen de referencia de la BD
    ↓
1. Leer embedding de la imagen de referencia (ya existe en BD)
    ↓
2. Búsqueda vectorial usando ese embedding
    ↓
3. Calcular similitud coseno con todas las demás imágenes
    ↓
4. Recuperar top-5 imágenes más similares visualmente
    ↓
Retorna: Imágenes similares (sin LLM, sin texto)
```

### 📝 Proceso de Ejemplo

```javascript
Imagen de referencia: "Playa de San Andrés"
→ Busca: Otras playas con características visuales similares
```

### 🔧 Implementación Técnica

**Request:**

```javascript
// 1. Obtener imagen de referencia
GET /api/rag/images?limit=1&category=destino

// 2. Buscar similares
GET /api/rag/similar/:mediaId?k=5
```

**Proceso Interno:**

1. **Leer embedding**: Recupera `image_embedding` del documento referencia
2. **Vector Search**:
   ```javascript
   {
     $vectorSearch: {
       queryVector: referenceImage.image_embedding,  // Vector de 512 dim
       path: "image_embedding",
       numCandidates: 50,
       limit: 5
     }
   }
   ```
3. **Similitud coseno**: MongoDB calcula distancia entre vectores
4. **Ranking**: Ordena por score descendente (1.0 = idéntico, 0.0 = diferente)

### 📤 Salida Esperada

- **Imágenes**: Lugares con composición visual similar (colores, formas, escena)
- **Scores**: 0.75-0.95 (alta similitud visual)
- **Sin texto**: No usa LLM ni queries textuales
- **Tiempo**: ~250-350ms (solo búsqueda vectorial)

### 🎓 Conceptos Evaluados

- ✅ Similitud visual pura (sin intervención de texto)
- ✅ Embeddings de imagen funcionando correctamente
- ✅ Capacidad de CLIP para capturar características visuales
- ✅ Vector search sobre embeddings pre-calculados

### 🧠 ¿Por qué funciona?

CLIP fue entrenado con 400M de pares imagen-texto, aprendiendo a:

- Identificar objetos, escenas y composiciones
- Reconocer colores, texturas y patrones
- Entender contexto visual (playa, montaña, ciudad, etc.)

---

## 💬 CASO 4: RAG Complejo con LLM (TEXTO → IMÁGENES → TEXTO enriquecido)

### 🎯 Objetivo

Evaluar la integración completa del pipeline RAG con queries complejas que requieren razonamiento y síntesis.

### 🔄 Flujo de Ejecución

```
Usuario: Query compleja con múltiples intenciones
    ↓
1. Generar embedding del texto (CLIP)
    ↓
2. Búsqueda vectorial amplia (k=10 para más contexto)
    ↓
3. Recuperar imágenes de múltiples categorías
    ↓
4. Construir contexto rico con metadatos diversos
    ↓
5. LLM analiza y sintetiza información
    ↓
6. Genera respuesta estructurada con recomendaciones
    ↓
Retorna: Respuesta compleja + imágenes de soporte
```

### 📝 Query de Ejemplo

```javascript
"¿Cuáles son las mejores opciones para un viaje romántico en pareja?
Dame recomendaciones específicas de destinos, hoteles y actividades"
```

### 🔧 Implementación Técnica

**Request:**

```javascript
POST /api/rag/query
{
  query: "¿Cuáles son las mejores opciones para un viaje romántico en pareja?...",
  k: 10,  // ← Más resultados para contexto rico
  includeAnswer: true
}
```

**Proceso Interno:**

1. **Embedding multimodal**: CLIP entiende "romántico", "pareja", "viaje"
2. **Búsqueda amplia**: Recupera 10 documentos (destinos, hoteles, actividades)
3. **Contexto estructurado**:
   ```
   Contexto para el LLM:
   - Imagen 1: Hotel Casa Colonial (hotel, romántico, vista-mar)
   - Imagen 2: Playa de Varadero (destino, playa, tropical)
   - Imagen 3: Cena romántica (gastronomía, pareja)
   - ... (7 más)
   ```
4. **Prompt al LLM**:

   ```
   Basándote en las siguientes opciones turísticas:
   [contexto de 10 imágenes]

   Responde: ¿Cuáles son las mejores opciones para un viaje romántico?
   ```

5. **LLM genera**: Respuesta estructurada con múltiples recomendaciones

### 📤 Salida Esperada

- **Imágenes**: 10 resultados variados (hoteles, destinos, actividades)
- **Respuesta LLM**: Texto largo (~200-400 palabras) con:
  - Recomendaciones de destinos específicos
  - Hoteles sugeridos con características
  - Actividades románticas
  - Justificación de cada recomendación
- **Tiempo**: ~400-600ms (búsqueda) + ~2000-4000ms (LLM genera más texto)

### 🎓 Conceptos Evaluados

- ✅ Queries complejas multi-intención
- ✅ Recuperación de contexto diverso
- ✅ Síntesis de información por LLM
- ✅ Generación de respuestas estructuradas
- ✅ RAG completo con razonamiento

### 🔬 Diferencia con Caso 1

| Aspecto           | Caso 1                | Caso 4                               |
| ----------------- | --------------------- | ------------------------------------ |
| **Query**         | Simple y directa      | Compleja, multi-intención            |
| **k**             | 5 resultados          | 10 resultados                        |
| **Contexto**      | Focalizado            | Diverso y rico                       |
| **Respuesta LLM** | Corta (~100 palabras) | Larga y estructurada (~300 palabras) |
| **Propósito**     | Búsqueda específica   | Análisis y recomendaciones           |

---

## 🌐 CASO 5: Búsqueda Multimodal Cross-Modal (TEXTO → IMÁGENES sin LLM)

### 🎯 Objetivo

Evaluar la capacidad de CLIP para mapear texto e imagen en el mismo espacio vectorial, permitiendo búsqueda directa texto→imagen.

### 🔄 Flujo de Ejecución

```
Usuario: Descripción textual de imagen deseada
    ↓
1. Generar embedding de TEXTO con CLIP
    ↓
2. Búsqueda vectorial directa (texto busca imágenes)
    ↓
3. Similitud coseno: vector_texto vs vector_imagen
    ↓
4. Recuperar imágenes visualmente similares al concepto
    ↓
Retorna: Imágenes (SIN pasar por LLM)
```

### 📝 Query de Ejemplo

```javascript
"paisajes montañosos con nieve y lagos cristalinos";
```

### 🔧 Implementación Técnica

**Request:**

```javascript
GET /api/rag/search?query=paisajes montañosos con nieve...&k=5
```

**Proceso Interno:**

1. **Embedding de texto**: CLIP transforma texto en vector de 512 dimensiones
2. **Comparación directa**:

   ```javascript
   embedding_texto = CLIP.encode_text("paisajes montañosos...")
   // Vector resultado: [0.23, -0.45, 0.67, ..., 0.12]  (512 dims)

   // MongoDB busca imágenes con embeddings similares
   $vectorSearch: {
     queryVector: embedding_texto,  // ← Vector de TEXTO
     path: "image_embedding",        // ← Busca en embeddings de IMAGEN
     limit: 5
   }
   ```

3. **Similitud cross-modal**: Calcula coseno entre:
   - Vector de TEXTO ("paisajes montañosos...")
   - Vectores de IMAGEN (fotos reales en la BD)
4. **NO usa LLM**: Devuelve imágenes directamente

### 📤 Salida Esperada

- **Imágenes**: Fotos de montañas con nieve y lagos (score 0.70-0.85)
- **Sin respuesta textual**: Solo metadata de las imágenes
- **Tiempo**: ~200-300ms (muy rápido, sin LLM)

### 🎓 Conceptos Evaluados

- ✅ **Cross-modal search**: Texto busca imágenes directamente
- ✅ **Espacio vectorial compartido**: CLIP aprende texto e imagen en mismo espacio
- ✅ **Búsqueda semántica visual**: "nieve" encuentra imágenes nevadas
- ✅ **Eficiencia**: Sin overhead de LLM

### 🧠 ¿Por qué funciona el cross-modal search?

**Entrenamiento de CLIP:**

```
Imagen de montaña nevada  ──→  CLIP Encoder  ──→  [0.2, -0.4, 0.6, ...]
                                                         ↓
                                                    (512 dims)
                                                         ↑
Texto "montaña nevada"    ──→  CLIP Encoder  ──→  [0.2, -0.4, 0.6, ...]
```

CLIP fue entrenado con **contrastive learning** para que:

- Imagen de "perro" y texto "perro" → Vectores CERCANOS (similitud alta)
- Imagen de "perro" y texto "gato" → Vectores LEJANOS (similitud baja)

**Resultado**: Podemos usar vector de texto para buscar imágenes que "se vean" como ese texto.

### 🔬 Diferencia con Caso 1

| Aspecto       | Caso 1 (RAG)             | Caso 5 (Cross-modal)    |
| ------------- | ------------------------ | ----------------------- |
| **Input**     | Texto                    | Texto                   |
| **Output**    | Imágenes + Texto LLM     | Solo imágenes           |
| **Usa LLM**   | ✅ Sí                    | ❌ No                   |
| **Tiempo**    | ~1500ms                  | ~250ms                  |
| **Propósito** | Respuesta conversacional | Búsqueda visual directa |
| **Endpoint**  | `POST /query`            | `GET /search`           |

---

## 📊 Comparación de Casos de Prueba

| Caso  | Tipo              | Input           | Output                 | Usa LLM | Tiempo  | Complejidad |
| ----- | ----------------- | --------------- | ---------------------- | ------- | ------- | ----------- |
| **1** | RAG Semántico     | Texto           | Imágenes + Texto       | ✅      | ~1500ms | Media       |
| **2** | RAG Híbrido       | Texto + Filtros | Imágenes + Texto       | ✅      | ~1200ms | Media       |
| **3** | Visual Similarity | Imagen          | Imágenes               | ❌      | ~300ms  | Baja        |
| **4** | RAG Complejo      | Texto complejo  | Imágenes + Texto largo | ✅      | ~3000ms | Alta        |
| **5** | Cross-Modal       | Texto           | Solo imágenes          | ❌      | ~250ms  | Baja        |

---

## 🔧 Arquitectura Técnica Completa

### Stack Tecnológico

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND / API CLIENT                 │
│                  (axios, test-cases.js)                  │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                   NODE.JS API SERVER                     │
│                  (Express + Controllers)                 │
├─────────────────────────────────────────────────────────┤
│  • POST /api/rag/query     → RAG completo (LLM)         │
│  • GET  /api/rag/search    → Solo búsqueda vectorial    │
│  • GET  /api/rag/similar   → Similitud imagen-imagen    │
└─────────────────────────────────────────────────────────┘
           ↓                           ↓                ↓
    ┌──────────┐            ┌─────────────────┐   ┌──────────┐
    │   CLIP   │            │  MongoDB Atlas  │   │ OpenAI   │
    │  Server  │            │  Vector Search  │   │   API    │
    │ (Python) │            │                 │   │  (GPT)   │
    └──────────┘            └─────────────────┘   └──────────┘
         ↓                           ↓                  ↓
    Embeddings              Vector Index          Generación
    512 dims                (cosine sim)          de texto
```

### Flujo de Datos - RAG Completo (Caso 1, 2, 4)

```
1. USER → "destinos paradisíacos"
         ↓
2. API → CLIP Server: encode_text("destinos paradisíacos")
         ↓
3. CLIP → API: [0.23, -0.45, 0.67, ..., 0.12] (512 dims)
         ↓
4. API → MongoDB: $vectorSearch con queryVector
         ↓
5. MongoDB → API: Top-5 documentos con scores
         ↓
6. API construye contexto:
   "Basado en estas imágenes:
    - Playa Varadero (playa, tropical, arena-blanca)
    - Maldivas Resort (hotel, lujo, playa)
    ..."
         ↓
7. API → OpenAI: prompt + contexto
         ↓
8. OpenAI → API: "Te recomiendo visitar Varadero porque..."
         ↓
9. API → USER: {results: [...], answer: "..."}
```

### MongoDB Vector Search - Configuración

**Índice vectorial requerido:**

```json
{
  "fields": [
    {
      "type": "vector",
      "path": "image_embedding",
      "numDimensions": 512,
      "similarity": "cosine"
    },
    {
      "type": "filter",
      "path": "category"
    },
    {
      "type": "filter",
      "path": "tags"
    }
  ]
}
```

**Query de ejemplo:**

```javascript
db.media.aggregate([
  {
    $vectorSearch: {
      index: "vector_search_index",
      path: "image_embedding",
      queryVector: [0.23, -0.45, ..., 0.12],  // 512 números
      numCandidates: 50,  // Pre-filtro
      limit: 5,           // Resultados finales
      filter: { category: { $eq: "hotel" } }  // Opcional
    }
  },
  {
    $project: {
      title: 1,
      category: 1,
      tags: 1,
      caption: 1,
      score: { $meta: "vectorSearchScore" }
    }
  }
])
```

---

## 📈 Métricas de Rendimiento

### Tiempos Esperados por Caso

| Componente       | Caso 1      | Caso 2      | Caso 3     | Caso 4      | Caso 5     |
| ---------------- | ----------- | ----------- | ---------- | ----------- | ---------- |
| Embedding (CLIP) | 50ms        | 50ms        | 0ms\*      | 50ms        | 50ms       |
| Vector Search    | 200ms       | 250ms       | 200ms      | 300ms       | 200ms      |
| LLM Generation   | 1000ms      | 800ms       | 0ms        | 2500ms      | 0ms        |
| **TOTAL**        | **~1250ms** | **~1100ms** | **~200ms** | **~2850ms** | **~250ms** |

\* Caso 3 usa embedding pre-calculado de imagen existente

### Factores que Afectan el Rendimiento

1. **CLIP Embedding**:

   - Depende de GPU disponible
   - ~20-50ms en CPU
   - ~5-10ms en GPU

2. **MongoDB Vector Search**:

   - Depende de `numCandidates` (más candidatos = más lento)
   - Índice vectorial DEBE estar creado
   - Red (si Atlas está en cloud)

3. **LLM (OpenAI)**:
   - Depende de longitud de respuesta
   - Respuestas cortas: ~800-1200ms
   - Respuestas largas: ~2000-4000ms
   - Puede variar según carga de OpenAI

---

## 🎯 Casos de Uso Real

### Caso 1 - Búsqueda Conversacional

**Escenario**: Chatbot de agencia de viajes

```
Usuario: "Quiero ir a un lugar cálido con playa"
Sistema: Busca semánticamente → Retorna playas tropicales + recomendaciones
```

### Caso 2 - Búsqueda Filtrada

**Escenario**: Filtro de categoría en sitio web

```
Usuario: Selecciona "Solo Hoteles" + busca "resort con piscina"
Sistema: Filtra por category=hotel → Busca vectorialmente "resort con piscina"
```

### Caso 3 - Búsqueda por Similitud Visual

**Escenario**: "Más como este"

```
Usuario: Click en imagen de playa caribeña
Sistema: Encuentra visualmente → Retorna playas con colores/composición similar
```

### Caso 4 - Asistente Inteligente

**Escenario**: Planificación compleja de viaje

```
Usuario: "¿Qué hacer en una luna de miel de 7 días?"
Sistema: Busca ampliamente → LLM sintetiza itinerario completo
```

### Caso 5 - Búsqueda Visual Rápida

**Escenario**: Galería de imágenes

```
Usuario: Escribe "atardecer en la playa"
Sistema: Retorna fotos de atardeceres → Sin texto adicional
```

---

## 🚀 Ejecución de los Tests

### Prerequisitos

```bash
# 1. MongoDB Atlas con índice vectorial creado
# 2. Servidor Node.js corriendo
npm start

# 3. Servicio Python CLIP activo
python python/clip_service.py

# 4. Imágenes de muestra cargadas
npm run load-samples
```

### Ejecutar Todos los Casos

```bash
npm run test-cases
```

### Ejecutar Caso Individual

```javascript
const { testCase1 } = require("./scripts/test-cases");
await testCase1();
```

---

## 📊 Interpretación de Resultados

### Scores de Similitud

- **0.90 - 1.00**: Coincidencia casi perfecta (misma imagen o muy similar)
- **0.75 - 0.90**: Alta similitud (tema/escena muy relacionado)
- **0.60 - 0.75**: Similitud moderada (concepto relacionado)
- **0.40 - 0.60**: Baja similitud (conexión débil)
- **< 0.40**: No relacionado

### Calidad de Respuestas LLM

- ✅ **Buena**: Menciona imágenes específicas del contexto
- ✅ **Buena**: Proporciona detalles precisos (nombres, ubicaciones)
- ⚠️ **Regular**: Respuesta genérica sin usar contexto
- ❌ **Mala**: Información incorrecta o alucinaciones

---

## 🔍 Troubleshooting

### Caso 2 devuelve 0 resultados

**Causa**: Filtro muy restrictivo (ej: tags inexistentes)
**Solución**: Usar solo `category` sin tags específicos

### Caso 4 muestra `[object Object]ms`

**Causa**: Orden incorrecto de parámetros en `displayResults()`
**Solución**: Verificar que sea `(testNumber, testName, query, results, responseTime)`

### Todos los casos fallan

**Causa**: Índice vectorial no creado en MongoDB Atlas
**Solución**: Crear índice `vector_search_index` en colección `media`

---

## 📚 Referencias

- **CLIP Paper**: https://arxiv.org/abs/2103.00020
- **MongoDB Vector Search**: https://www.mongodb.com/docs/atlas/atlas-vector-search/
- **RAG Pattern**: https://arxiv.org/abs/2005.11401
- **OpenAI API**: https://platform.openai.com/docs

---

**Última actualización**: Diciembre 2025
