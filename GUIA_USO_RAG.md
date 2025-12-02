# 🚀 GUÍA DE USO DEL SISTEMA RAG - Paso a Paso

Esta guía te explica cómo usar **todas las funcionalidades RAG** (no CRUD tradicional) del sistema de agencia de viajes.

---

## 📚 ¿Qué es el Sistema RAG?

**RAG = Retrieval-Augmented Generation** (Generación Aumentada por Recuperación)

Es un sistema inteligente que:
1. 🖼️ **Almacena imágenes** con embeddings vectoriales (usando IA)
2. 🔍 **Busca por texto natural** ("playas paradisíacas") y encuentra imágenes relevantes
3. 🤖 **Genera respuestas** usando un LLM (Inteligencia Artificial) con el contexto de las imágenes encontradas
4. 🎯 **Búsqueda multimodal**: busca imágenes similares a otras imágenes

---

## 🎯 PASO 1: Iniciar los Servicios

### Terminal 1: Servicio CLIP (Python - Genera embeddings)

```bash
cd python
python clip_service.py
```

**Deberías ver:**
```
🔄 Cargando modelo CLIP...
✅ Modelo CLIP cargado exitosamente
📱 Usando dispositivo: cpu
 * Running on http://0.0.0.0:5000
```

### Terminal 2: Servidor Node.js (API)

```bash
npm start
```

**Deberías ver:**
```
✅ Conectado a MongoDB (Mongoose) - DB: agencia_turismo
✅ Conectado a MongoDB (Native Client) - DB: multimodal_rag
📦 GridFS configurado correctamente
🚀 Servidor corriendo en http://localhost:3000
```

---

## 🎯 PASO 2: Cargar Imágenes de Ejemplo (AUTOMÁTICO)

En lugar de subir imágenes manualmente, usa el script automatizado:

```bash
npm run load-samples
```

Esto carga **15 imágenes de ejemplo** en categorías:
- 🏖️ Destinos (playas, islas)
- 🏨 Hoteles (resorts de lujo)
- 🏄 Actividades (deportes, aventuras)
- 🍽️ Gastronomía (restaurantes)
- 💒 Eventos (bodas, corporativos)
- 🚤 Transporte (vehículos)

**Tiempo:** 1-2 minutos

---

## 🎯 PASO 3: Usar las Funcionalidades RAG

### 🔍 **Funcionalidad 1: BÚSQUEDA POR TEXTO NATURAL**

Busca imágenes usando lenguaje natural (no necesitas palabras clave exactas).

**Endpoint:** `GET /api/rag/search`

**Ejemplo con curl:**
```bash
curl "http://localhost:3000/api/rag/search?query=playas%20paradisiacas%20con%20arena%20blanca&k=5"
```

**Ejemplo con Postman:**
- Método: `GET`
- URL: `http://localhost:3000/api/rag/search`
- Query Params:
  - `query`: `playas paradisiacas con arena blanca`
  - `k`: `5` (número de resultados)

**Respuesta:**
```json
{
  "success": true,
  "query": "playas paradisiacas con arena blanca",
  "totalResults": 5,
  "results": [
    {
      "_id": "674d1234567890abcdef",
      "title": "Playa del Carmen - Caribe Mexicano",
      "category": "destinos",
      "tags": ["playa", "caribe", "mexico"],
      "score": 0.8765,
      "image_file_id": "674d1234567890abcdef123"
    }
  ]
}
```

**💡 Casos de uso:**
- "hoteles de lujo con vista al mar"
- "actividades extremas y deportes acuáticos"
- "restaurantes románticos para bodas"
- "transporte de lujo para ejecutivos"

---

### 🤖 **Funcionalidad 2: BÚSQUEDA + RESPUESTA INTELIGENTE (RAG COMPLETO)**

Busca imágenes Y genera una respuesta contextualizada usando IA.

**Endpoint:** `POST /api/rag/query`

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/api/rag/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "¿Cuáles son las mejores opciones para una luna de miel en el caribe?",
    "k": 5,
    "includeAnswer": true
  }'
```

**Ejemplo con Postman:**
- Método: `POST`
- URL: `http://localhost:3000/api/rag/query`
- Body (JSON):
```json
{
  "query": "¿Cuáles son las mejores opciones para una luna de miel en el caribe?",
  "category": "destinos",
  "k": 5,
  "includeAnswer": true
}
```

**Respuesta:**
```json
{
  "success": true,
  "query": "¿Cuáles son las mejores opciones para una luna de miel en el caribe?",
  "totalResults": 5,
  "results": [
    {
      "title": "Playa del Carmen",
      "category": "destinos",
      "score": 0.89,
      "caption": "Hermosa playa de arena blanca..."
    }
  ],
  "answer": "Para tu luna de miel en el Caribe, te recomiendo las siguientes opciones basadas en nuestras imágenes:\n\n1. **Playa del Carmen** - Perfecta combinación de playas vírgenes y vida nocturna...",
  "context": [
    "Playa del Carmen - Caribe Mexicano: Hermosa playa de arena blanca...",
    "Punta Cana Resort - República Dominicana: Resort todo incluido..."
  ]
}
```

**💡 Diferencia con búsqueda simple:**
- ✅ Genera una respuesta personalizada
- ✅ Explica por qué recomienda cada opción
- ✅ Combina información de múltiples imágenes
- ✅ Usa lenguaje natural y conversacional

---

### 🎨 **Funcionalidad 3: BÚSQUEDA POR IMAGEN SIMILAR**

Encuentra imágenes visualmente similares a una que ya tienes.

**Endpoint:** `GET /api/rag/similar/:mediaId`

**Paso 1:** Obtén el ID de una imagen (de una búsqueda previa o de la lista)

**Paso 2:** Busca imágenes similares:

```bash
curl "http://localhost:3000/api/rag/similar/674d1234567890abcdef?k=5"
```

**Ejemplo con Postman:**
- Método: `GET`
- URL: `http://localhost:3000/api/rag/similar/674d1234567890abcdef`
- Query Params:
  - `k`: `5`

**Respuesta:**
```json
{
  "success": true,
  "sourceId": "674d1234567890abcdef",
  "totalResults": 5,
  "results": [
    {
      "title": "Otra playa similar",
      "score": 0.92,
      "category": "destinos"
    }
  ]
}
```

**💡 Casos de uso:**
- Un cliente te muestra una foto y quieres encontrar destinos similares
- Buscar hoteles con estilo arquitectónico similar
- Encontrar actividades parecidas

---

### 📤 **Funcionalidad 4: SUBIR IMAGEN CON IA**

Sube una imagen nueva y el sistema automáticamente:
1. Genera su embedding vectorial (512 dimensiones)
2. La almacena en GridFS
3. Crea metadatos indexables

**Endpoint:** `POST /api/rag/upload`

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/api/rag/upload \
  -F "image=@/ruta/a/tu/imagen.jpg" \
  -F "title=Playa de Santa Marta" \
  -F "category=destinos" \
  -F "tags=playa,colombia,caribe" \
  -F "caption=Hermosa playa en la costa caribeña colombiana"
```

**Ejemplo con Postman:**
- Método: `POST`
- URL: `http://localhost:3000/api/rag/upload`
- Body: `form-data`
  - `image`: (seleccionar archivo)
  - `title`: `Playa de Santa Marta`
  - `category`: `destinos`
  - `tags`: `playa,colombia,caribe`
  - `caption`: `Hermosa playa en la costa caribeña colombiana`

**Respuesta:**
```json
{
  "success": true,
  "message": "Imagen subida exitosamente",
  "mediaId": "674d9876543210fedcba",
  "fileId": "674d9876543210fedcba111",
  "document": {
    "title": "Playa de Santa Marta",
    "category": "destinos",
    "tags": ["playa", "colombia", "caribe"],
    "image_embedding": [0.123, -0.456, ...], // 512 valores
    "created_at": "2025-12-02T..."
  }
}
```

**💡 Lo que hace automáticamente:**
- 🧠 Analiza la imagen con CLIP
- 📊 Genera vector de 512 dimensiones
- 📦 Sube a GridFS (optimizado para archivos grandes)
- 🔍 La imagen se puede buscar inmediatamente

---

### 📋 **Funcionalidad 5: LISTAR IMÁGENES CON FILTROS**

Lista todas las imágenes con paginación y filtros.

**Endpoint:** `GET /api/rag/images`

```bash
curl "http://localhost:3000/api/rag/images?page=1&limit=10&category=destinos"
```

**Parámetros opcionales:**
- `page`: número de página (default: 1)
- `limit`: resultados por página (default: 20)
- `category`: filtrar por categoría
- `tags`: filtrar por tags (separados por coma)

**Respuesta:**
```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "total": 45,
  "totalPages": 5,
  "documents": [...]
}
```

---

### 🖼️ **Funcionalidad 6: OBTENER IMAGEN (ARCHIVO BINARIO)**

Descarga la imagen real (no solo metadatos).

**Endpoint:** `GET /api/rag/image/:mediaId`

**Para ver la imagen en el navegador:**
```
http://localhost:3000/api/rag/image/674d1234567890abcdef
```

**Para obtener solo metadatos:**
```
http://localhost:3000/api/rag/image/674d1234567890abcdef?metadata=true
```

---

### 📊 **Funcionalidad 7: RESUMEN DE CATEGORÍA CON IA**

Genera un resumen inteligente de todas las imágenes de una categoría.

**Endpoint:** `GET /api/rag/summary/:category`

```bash
curl "http://localhost:3000/api/rag/summary/destinos"
```

**Respuesta:**
```json
{
  "success": true,
  "category": "destinos",
  "totalImages": 15,
  "summary": "Nuestra colección de destinos incluye hermosas playas del Caribe como Playa del Carmen y Punta Cana, con características como arena blanca y aguas cristalinas. También ofrecemos destinos culturales y de aventura..."
}
```

---

### 🗑️ **Funcionalidad 8: ELIMINAR IMAGEN**

Elimina imagen de GridFS + metadatos + embeddings.

**Endpoint:** `DELETE /api/rag/image/:mediaId`

```bash
curl -X DELETE http://localhost:3000/api/rag/image/674d1234567890abcdef
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Imagen eliminada exitosamente"
}
```

---

## 🧪 PASO 4: Ejecutar Casos de Prueba Automatizados

Para probar TODAS las funcionalidades de una vez:

```bash
npm run test-cases
```

Esto ejecuta **5 casos de prueba** que demuestran:
1. ✅ Búsqueda semántica
2. ✅ Filtros híbridos (búsqueda + filtros)
3. ✅ Búsqueda multimodal (imagen → imagen)
4. ✅ RAG completo (búsqueda + LLM)
5. ✅ Búsqueda por categoría específica

**Salida esperada:**
```
🧪 EJECUTANDO CASOS DE PRUEBA OBLIGATORIOS

================================================================================
CASO DE PRUEBA 1: Búsqueda Semántica
================================================================================
📝 Query: destinos paradisíacos para luna de miel
⏱️  Tiempo: 1250ms
📊 Resultados: 5

🔍 Top 3:
  1. Playa del Carmen (score: 0.8765)
  2. Punta Cana Resort (score: 0.8432)
  3. Islas Maldivas (score: 0.8201)

🤖 Respuesta LLM:
Para tu luna de miel, te recomiendo...

================================================================================
📊 MÉTRICAS FINALES
⏱️  Tiempo promedio: 1350ms
📈 Precisión: 100%
```

---

## 📊 Diferencias: RAG vs CRUD Tradicional

| Característica | CRUD Tradicional | Sistema RAG |
|---------------|-----------------|-------------|
| **Búsqueda** | Por campos exactos (`nombre="playa"`) | Por significado semántico (`"destinos románticos"`) |
| **Similitud** | No disponible | Encuentra imágenes similares visualmente |
| **Respuestas** | Solo devuelve datos | Genera respuestas contextualizadas con IA |
| **Almacenamiento** | Base de datos normal | GridFS + Vector embeddings |
| **Filtros** | Solo filtros exactos | Combinación de similitud + filtros |
| **IA** | No usa | CLIP (embeddings) + Groq LLM (respuestas) |

---

## 🎯 Casos de Uso Prácticos

### 1. **Cliente busca destino sin saber exactamente qué quiere**
```
Cliente: "Quiero algo romántico, tranquilo, con buena comida"
Sistema RAG: Encuentra destinos + genera recomendación personalizada
```

### 2. **Cliente muestra una foto de revista**
```
Cliente: "Quiero algo como esta foto"
Sistema RAG: Búsqueda por imagen similar
```

### 3. **Agente necesita describir categoría completa**
```
Agente: "Resumen de todos nuestros destinos"
Sistema RAG: Genera resumen automático con IA
```

### 4. **Búsqueda multicriterio compleja**
```
Cliente: "Hotel de lujo, cerca de playa, con spa"
Sistema RAG: Combina búsqueda vectorial + filtros de metadatos
```

---

## 🔧 Configuración Adicional

### Categorías Disponibles
- `destinos` - Lugares turísticos
- `hoteles` - Alojamiento
- `actividades` - Tours y actividades
- `gastronomia` - Restaurantes
- `eventos` - Bodas, corporativos
- `transporte` - Vehículos

### Tags Sugeridos
- Para destinos: `playa`, `montaña`, `ciudad`, `cultural`, `aventura`
- Para hoteles: `lujo`, `cinco-estrellas`, `todo-incluido`, `boutique`
- Para actividades: `extremo`, `familiar`, `acuatico`, `cultural`

---

## 📚 Recursos Adicionales

- **Colección Postman:** `/postman/RAG_API_Collection.json`
- **Documentación Atlas:** `/docs/ATLAS_VECTOR_SEARCH_SETUP.md`
- **Scripts de carga:** `/scripts/load-sample-images.js`
- **Casos de prueba:** `/scripts/test-cases.js`

---

## ❓ Troubleshooting

### Problema: "Servicio CLIP no disponible"
**Solución:** Asegúrate de que `python clip_service.py` esté corriendo en el puerto 5000

### Problema: "Vector index not found"
**Solución:** Crea el índice vectorial en MongoDB Atlas (ver `ATLAS_VECTOR_SEARCH_SETUP.md`)

### Problema: "Groq API error"
**Solución:** Verifica que `GROQ_API_KEY` esté configurado en `.env`

---

¡Listo! Ahora puedes usar todas las funcionalidades RAG del sistema. 🚀

