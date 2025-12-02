# Configuración del Índice Vector Search en MongoDB Atlas

Este documento explica cómo configurar el índice de búsqueda vectorial en MongoDB Atlas para el sistema RAG.

## 📍 Pasos de Configuración

### 1. Acceder a MongoDB Atlas

1. Inicia sesión en [MongoDB Atlas](https://cloud.mongodb.com)
2. Selecciona tu cluster (debe ser M10 o superior para vector search)
3. En el menú lateral, haz clic en **"Search"**

### 2. Crear Nuevo Índice

1. Haz clic en **"Create Search Index"**
2. Selecciona **"JSON Editor"** (no uses Visual Editor)
3. Haz clic en **"Next"**

### 3. Configuración del Índice

**Información básica:**

- **Index Name:** `vector_search_index`
- **Database:** `agencia_viajes_rag`
- **Collection:** `media`

**JSON Configuration:**

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
    },
    {
      "type": "filter",
      "path": "related_entity_id"
    }
  ]
}
```

### 4. Explicación de la Configuración

#### Campo Vector

```json
{
  "type": "vector",
  "path": "image_embedding",
  "numDimensions": 512,
  "similarity": "cosine"
}
```

- **type**: `vector` - Indica que es un campo vectorial
- **path**: `image_embedding` - Nombre del campo en el documento que contiene el vector
- **numDimensions**: `512` - Dimensión del vector CLIP (openai/clip-vit-base-patch32)
- **similarity**: `cosine` - Métrica de similitud (cosine, euclidean, dotProduct)

#### Campos de Filtro

```json
{
  "type": "filter",
  "path": "category"
}
```

Permite filtrar resultados por:

- `category`: Categoría de la imagen (destinos, hoteles, actividades, etc.)
- `tags`: Etiquetas asociadas
- `related_entity_id`: ID de entidad relacionada (hotel, actividad, etc.)

### 5. Crear Índice

1. Haz clic en **"Create Search Index"**
2. Espera a que el índice se construya (puede tomar unos minutos)
3. Verifica que el estado sea **"Active"**

## 🔍 Verificar el Índice

### Usando MongoDB Shell

```javascript
use agencia_viajes_rag

// Verificar índices de búsqueda
db.media.aggregate([
  {
    $listSearchIndexes: {}
  }
])
```

### Resultado Esperado

```json
{
  "id": "...",
  "name": "vector_search_index",
  "type": "search",
  "status": "READY",
  "queryable": true,
  "latestDefinition": {
    "fields": [...]
  }
}
```

## 🧪 Probar el Índice

### Ejemplo de Query Vector Search

```javascript
db.media.aggregate([
  {
    $vectorSearch: {
      index: "vector_search_index",
      path: "image_embedding",
      queryVector: [0.1, 0.2, ...], // 512 floats
      numCandidates: 100,
      limit: 5
    }
  },
  {
    $project: {
      title: 1,
      category: 1,
      score: { $meta: "vectorSearchScore" }
    }
  }
])
```

### Con Filtros

```javascript
db.media.aggregate([
  {
    $vectorSearch: {
      index: "vector_search_index",
      path: "image_embedding",
      queryVector: [0.1, 0.2, ...],
      numCandidates: 100,
      limit: 5,
      filter: {
        category: { $eq: "destinos" },
        tags: { $in: ["playa", "caribe"] }
      }
    }
  }
])
```

## ⚠️ Requisitos Importantes

### 1. Cluster Tier

- **Mínimo**: M10 (Dedicated cluster)
- **Recomendado**: M30+ para producción
- Los clusters gratuitos (M0) **NO soportan** vector search

### 2. MongoDB Version

- **Mínimo**: MongoDB 6.0.11 o superior
- **Recomendado**: MongoDB 7.0+

### 3. Límites

| Tier | Max Vector Dimensions | Max Documents |
| ---- | --------------------- | ------------- |
| M10  | 2048                  | Unlimited     |
| M30  | 4096                  | Unlimited     |
| M50+ | 4096                  | Unlimited     |

### 4. Dimensiones del Vector

```javascript
// CLIP vit-base-patch32: 512 dimensiones
model = "openai/clip-vit-base-patch32"; // ✅ 512D

// CLIP vit-large-patch14: 768 dimensiones
model = "openai/clip-vit-large-patch14"; // ❌ Requiere actualizar numDimensions

// Ada-002 (OpenAI): 1536 dimensiones
model = "text-embedding-ada-002"; // ❌ Requiere actualizar numDimensions
```

## 🔧 Troubleshooting

### Error: "Index not found"

**Causa**: El nombre del índice no coincide con el código.

**Solución**:

1. Verifica que `VECTOR_INDEX_NAME` en `.env` sea `vector_search_index`
2. Confirma el nombre en Atlas Search UI

### Error: "Dimension mismatch"

**Causa**: El vector tiene diferente número de dimensiones.

**Solución**:

1. Verifica que el modelo CLIP sea `vit-base-patch32` (512D)
2. Confirma que `numDimensions: 512` en el índice

### Error: "Query returned no results"

**Causas posibles**:

1. El índice aún no está construido → Espera a que esté "Active"
2. No hay documentos con embeddings → Sube imágenes primero
3. El índice apunta a la colección incorrecta → Verifica database/collection

### Índice "Building" por mucho tiempo

**Normal**:

- <1000 docs: 1-5 minutos
- 1000-10000 docs: 5-15 minutos
- > 10000 docs: 15-60 minutos

**Si tarda >1 hora**:

1. Contacta a soporte de MongoDB Atlas
2. Verifica el tamaño del cluster

## 📊 Monitoreo del Índice

### Métricas Importantes

1. **Index Size**: Espacio usado por el índice
2. **Query Performance**: Tiempo de respuesta
3. **Index Status**: Active/Building/Failed

### Acceder a Métricas

1. MongoDB Atlas → Tu Cluster
2. Search → Nombre del índice → **"Metrics"** tab
3. Revisa:
   - Query Count
   - Average Query Time
   - Index Size Over Time

## 🔄 Actualizar el Índice

Si necesitas cambiar la configuración:

1. **NO elimines** el índice si tiene datos en producción
2. Crea un **nuevo índice** con un nombre diferente
3. Prueba con el nuevo índice
4. Actualiza el código para usar el nuevo índice
5. Elimina el índice antiguo cuando todo funcione

### Ejemplo: Añadir un nuevo campo filtrable

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
    },
    {
      "type": "filter",
      "path": "related_entity_id"
    },
    {
      "type": "filter",
      "path": "created_at" // ← Nuevo campo
    }
  ]
}
```

## 📚 Recursos Adicionales

- [MongoDB Vector Search Docs](https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-overview/)
- [Create Vector Search Index](https://www.mongodb.com/docs/atlas/atlas-vector-search/create-index/)
- [Vector Search Query Operators](https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-stage/)
- [CLIP Model Documentation](https://huggingface.co/openai/clip-vit-base-patch32)

## ✅ Checklist de Configuración

- [ ] Cluster M10 o superior
- [ ] MongoDB 6.0.11+
- [ ] Índice creado con nombre `vector_search_index`
- [ ] Database: `agencia_viajes_rag`
- [ ] Collection: `media`
- [ ] numDimensions: `512`
- [ ] similarity: `cosine`
- [ ] Filtros: category, tags, related_entity_id
- [ ] Estado del índice: **Active**
- [ ] Probado con query de ejemplo
- [ ] Variable `VECTOR_INDEX_NAME` configurada en `.env`

---

**Nota**: Esta configuración es específica para el modelo CLIP `vit-base-patch32` con 512 dimensiones. Si cambias de modelo, deberás actualizar `numDimensions` en consecuencia.
