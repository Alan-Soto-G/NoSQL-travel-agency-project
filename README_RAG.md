# Sistema RAG Multimodal - Agencia de Viajes

Sistema de Recuperación Aumentada por Generación (RAG) con búsqueda multimodal usando CLIP embeddings, MongoDB Atlas Vector Search y Groq LLM.

## 🚀 Características

- **Búsqueda Multimodal**: Busca imágenes usando texto natural o imágenes similares
- **Embeddings CLIP**: Vectores de 512 dimensiones usando `openai/clip-vit-base-patch32`
- **Vector Search**: MongoDB Atlas Search con búsqueda vectorial nativa
- **LLM Integration**: Respuestas contextualizadas usando Groq (Llama 3.1)
- **GridFS Storage**: Almacenamiento eficiente de imágenes binarias
- **API REST**: Endpoints completos para upload, search, query y gestión

## 📋 Requisitos Previos

### Software

- Node.js >= 18.x
- Python >= 3.8
- MongoDB Atlas account (con cluster M10+ para vector search)
- Groq API Key

### Dependencias Node.js

```bash
npm install
```

### Dependencias Python

```bash
cd python
pip install -r requirements.txt
```

## ⚙️ Configuración

### 1. Variables de Entorno

Copia `.env.example` a `.env` y configura:

```bash
# MongoDB Atlas URI con credenciales
MONGODB_ATLAS_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/

# Nombre de la base de datos RAG
RAG_DB_NAME=agencia_viajes_rag

# Nombre del índice vectorial (debe coincidir con el creado en Atlas)
VECTOR_INDEX_NAME=vector_search_index

# Groq API Key (obtén en https://console.groq.com/keys)
GROQ_API_KEY=gsk_xxxxxxxxxxxxx

# CLIP Service URL
CLIP_SERVICE_URL=http://localhost:5000

# Puerto del servidor Node.js
PORT=3000
```

### 2. Configurar Vector Search Index en MongoDB Atlas

1. Ve a tu cluster en MongoDB Atlas
2. Navega a **Search** → **Create Search Index**
3. Selecciona **JSON Editor**
4. Usa la siguiente configuración:

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

5. Nombre del índice: `vector_search_index` (debe coincidir con `VECTOR_INDEX_NAME`)
6. Database: `agencia_viajes_rag`
7. Collection: `media`

### 3. Estructura de Directorios

Crea el directorio para imágenes temporales:

```bash
mkdir -p uploads/temp
mkdir -p data/images
```

## 🎯 Uso

### 1. Iniciar el servicio CLIP (Python)

Terminal 1:

```bash
cd python
python clip_service.py
```

Deberías ver:

```
🔄 Cargando modelo CLIP...
✅ Modelo CLIP cargado exitosamente
📱 Usando dispositivo: cpu
 * Running on http://0.0.0.0:5000
```

### 2. Iniciar el servidor Node.js

Terminal 2:

```bash
npm start
```

Deberías ver:

```
✅ Conectado a MongoDB
✅ Conectado a MongoDB Atlas para RAG
🚀 Servidor corriendo en http://localhost:3000
```

### 3. Probar la API

#### Health Check

```bash
curl http://localhost:5000/health
```

## 📡 API Endpoints

### 1. Subir Imagen

```bash
POST /api/rag/upload
Content-Type: multipart/form-data

FormData:
- image: archivo de imagen (jpeg, jpg, png, webp)
- title: "Playa de Cartagena"
- category: "destinos"
- tags: "playa,colombia,caribe"
- caption: "Hermosa playa con arena blanca"
- related_entity_id: "hotel_123"
```

Ejemplo con curl:

```bash
curl -X POST http://localhost:3000/api/rag/upload \
  -F "image=@./data/images/playa.jpg" \
  -F "title=Playa de Cartagena" \
  -F "category=destinos" \
  -F "tags=playa,colombia" \
  -F "caption=Hermosa playa caribeña"
```

### 2. Búsqueda con RAG (Texto → Imágenes + Respuesta LLM)

```bash
POST /api/rag/query
Content-Type: application/json

{
  "query": "playas paradisíacas para luna de miel",
  "category": "destinos",
  "k": 5,
  "includeAnswer": true
}
```

Respuesta:

```json
{
  "success": true,
  "query": "playas paradisíacas para luna de miel",
  "totalResults": 5,
  "results": [
    {
      "_id": "abc123",
      "title": "Playa de Cartagena",
      "category": "destinos",
      "score": 0.89,
      "caption": "Hermosa playa caribeña"
    }
  ],
  "answer": "Basándome en las imágenes encontradas, te recomiendo...",
  "context": "Se encontraron 5 resultados relacionados con playas..."
}
```

### 3. Búsqueda Simple (sin LLM)

```bash
GET /api/rag/search?query=hoteles+de+lujo&k=10&category=hoteles
```

### 4. Buscar Imágenes Similares

```bash
GET /api/rag/similar/abc123?k=5
```

### 5. Listar Imágenes

```bash
GET /api/rag/images?page=1&limit=20&category=destinos
```

### 6. Obtener Imagen

```bash
# Obtener binario
GET /api/rag/image/abc123

# Solo metadatos
GET /api/rag/image/abc123?metadata=true
```

### 7. Eliminar Imagen

```bash
DELETE /api/rag/image/abc123
```

### 8. Resumen de Categoría

```bash
GET /api/rag/summary/destinos
```

## 🏗️ Arquitectura

```
┌─────────────┐
│   Cliente   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│     Express API (Node.js)       │
│                                 │
│  ┌─────────────────────────┐  │
│  │  RAG Controller         │  │
│  └────────┬────────────────┘  │
│           │                    │
│  ┌────────▼────────────────┐  │
│  │  Storage Service        │  │
│  │  - Upload images        │  │
│  │  - GridFS operations    │  │
│  └────────┬────────────────┘  │
│           │                    │
│  ┌────────▼────────────────┐  │
│  │  Search Service         │  │
│  │  - Vector search        │  │
│  │  - Similarity queries   │  │
│  └────────┬────────────────┘  │
│           │                    │
│  ┌────────▼────────────────┐  │
│  │  LLM Service            │  │
│  │  - Context building     │  │
│  │  - Answer generation    │  │
│  └─────────────────────────┘  │
└──────┬──────────────────┬─────┘
       │                  │
       ▼                  ▼
┌─────────────┐    ┌─────────────┐
│ CLIP Server │    │ MongoDB     │
│  (Python)   │    │  Atlas      │
│             │    │             │
│ - CLIP      │    │ - GridFS    │
│   Model     │    │ - Vector    │
│ - Embeddings│    │   Search    │
└─────────────┘    └──────┬──────┘
                          │
                          ▼
                   ┌─────────────┐
                   │  Groq API   │
                   │   (LLM)     │
                   └─────────────┘
```

## 📁 Estructura de Datos

### Documento Media

```javascript
{
  "_id": ObjectId,
  "title": "Playa de Cartagena",
  "category": "destinos",
  "tags": ["playa", "colombia", "caribe"],
  "caption": "Hermosa playa con arena blanca",
  "image_file_id": ObjectId,  // Referencia a GridFS
  "image_embedding": [0.123, -0.456, ...],  // 512 floats
  "related_entity_id": "hotel_123",
  "metadata": {
    "contentType": "image/jpeg",
    "size": 245678
  },
  "created_at": ISODate,
  "updated_at": ISODate
}
```

## 🔧 Troubleshooting

### Error: "CLIP service unavailable"

- Verifica que el servicio Python esté corriendo en el puerto 5000
- Revisa los logs del servicio CLIP

### Error: "Vector search index not found"

- Asegúrate de haber creado el índice en MongoDB Atlas
- Verifica que el nombre coincida con `VECTOR_INDEX_NAME` en `.env`

### Error: "Groq API error"

- Verifica tu `GROQ_API_KEY` en `.env`
- Revisa los límites de tu plan en Groq Console

### Imágenes no se suben

- Verifica permisos del directorio `uploads/temp/`
- Revisa el límite de tamaño (10MB por defecto)

## 📚 Categorías Recomendadas

Para organizar mejor tus imágenes:

- `destinos`: Lugares turísticos, playas, montañas
- `hoteles`: Habitaciones, instalaciones, servicios
- `actividades`: Tours, deportes, eventos
- `transporte`: Vehículos, aeronaves, rutas
- `gastronomia`: Restaurantes, platillos
- `eventos`: Bodas, conferencias, celebraciones

## 🎨 Ejemplos de Queries

```
"playas paradisíacas para luna de miel"
"hoteles de lujo con vista al mar"
"actividades de aventura en la montaña"
"restaurantes con comida típica colombiana"
"salones para eventos corporativos"
```

## 📄 Licencia

Este proyecto es parte del curso de Bases de Datos No Relacionales - Universidad de Caldas.

## 🤝 Contribuciones

Proyecto académico - Universidad de Caldas 2025-2
