# Sistema de Agencia de Viajes con RAG Multimodal

[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/atlas)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?logo=python)](https://www.python.org/)
[![CLIP](https://img.shields.io/badge/CLIP-HuggingFace-FF6F00)](https://huggingface.co/openai/clip-vit-base-patch32)

Sistema completo de gestión de agencia de viajes con **Recuperación Aumentada por Generación (RAG)**, búsqueda vectorial multimodal usando CLIP embeddings, MongoDB Atlas Vector Search y Groq LLM.

## 🎯 Características Principales

### Sistema de Gestión Completo
- ✅ Gestión de clientes, reservas y viajes
- ✅ Administración de hoteles, aerolíneas y vehículos
- ✅ Control de facturas, cuotas y pagos
- ✅ Planificación de itinerarios y actividades turísticas
- ✅ Sistema de guías y actividades
- ✅ Geolocalización con GPS

### Sistema RAG Multimodal
- 🔍 **Búsqueda Semántica**: Encuentra destinos usando lenguaje natural
- 🖼️ **Búsqueda Multimodal**: Busca imágenes similares o usando texto
- 🤖 **Asistente IA**: Respuestas personalizadas con LLM (Groq + Llama 3.1)
- ⚡ **Performance**: Tiempos de respuesta <1s
- 🎨 **Embeddings CLIP**: 512 dimensiones para texto e imágenes
- 🔄 **Filtros Híbridos**: Combina búsqueda vectorial con filtros tradicionales

## 📊 Resultados de Pruebas

| Métrica | Valor | Estado |
|---------|-------|--------|
| Tiempo de respuesta promedio | 845ms | ✅ <1s |
| Tiempo más rápido (imagen→imagen) | 188ms | ⚡ Excelente |
| Precisión promedio | 67% | ✅ >60% |
| Tasa de éxito | 100% | ✅ Perfecto |
| Casos de prueba | 5/5 | ✅ Completo |

## 📋 Tabla de Contenidos

- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Casos de Prueba](#-casos-de-prueba)
- [Documentación](#-documentación)
- [Troubleshooting](#-troubleshooting)
- [Arquitectura](#-arquitectura)
- [Contribución](#-contribución)

## 🔧 Requisitos Previos

### Software Requerido

| Software | Versión Mínima | Verificar |
|----------|----------------|-----------|
| **Node.js** | 18.x | `node --version` |
| **npm** | 9.x | `npm --version` |
| **Python** | 3.8+ | `python --version` |
| **pip** | 21.x | `pip --version` |

### Cuentas y Servicios

1. **MongoDB Atlas** (Requerido)
   - Crear cuenta en [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Cluster **M10 o superior** (necesario para Vector Search)
   - Whitelisting de IP configurado
   - String de conexión disponible

2. **Groq API** (Requerido)
   - Crear cuenta en [console.groq.com](https://console.groq.com)
   - Generar API key
   - Gratis con cuota generosa (30 req/min)

### Requisitos del Sistema

- **RAM**: Mínimo 4GB (8GB recomendado para CLIP)
- **Disco**: 2GB libres
- **CPU**: 2+ cores recomendado
- **Conexión**: Internet estable (para APIs)

## 🚀 Instalación

### Paso 1: Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd NoSQL-travel-agency-project
```

### Paso 2: Instalar Dependencias de Node.js

```bash
npm install
```

**Dependencias principales instaladas:**
- `express` - Framework web
- `mongoose` - ODM para MongoDB
- `multer` - Upload de archivos
- `axios` - Cliente HTTP
- `dotenv` - Variables de entorno
- `groq-sdk` - Cliente Groq API

### Paso 3: Instalar Dependencias de Python

```bash
cd python
pip install -r requirements.txt
cd ..
```

**Dependencias Python instaladas:**
- `flask` - Framework web
- `transformers` - Hugging Face models
- `torch` - PyTorch
- `Pillow` - Procesamiento de imágenes
- `numpy` - Operaciones numéricas

### Paso 4: Crear Directorios Necesarios

```bash
mkdir -p uploads/temp
mkdir -p data/images
```

## ⚙️ Configuración

### 1. Variables de Entorno

Copia el archivo de ejemplo y edítalo:

```bash
cp .env.example .env
nano .env  # o usa tu editor favorito
```

**Configuración mínima requerida:**

```env
# ===================================
# MONGODB CONFIGURATION
# ===================================
# Tu connection string de MongoDB Atlas
MONGODB_ATLAS_URI=mongodb+srv://usuario:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Base de datos principal (gestión de agencia)
MONGODB_DB_NAME=agencia_viajes

# Base de datos RAG (búsqueda vectorial)
RAG_DB_NAME=agencia_viajes_rag

# ===================================
# VECTOR SEARCH CONFIGURATION
# ===================================
# Nombre del índice vectorial (debe coincidir con Atlas)
VECTOR_INDEX_NAME=vector_search_index

# ===================================
# GROQ API CONFIGURATION
# ===================================
# Tu API key de Groq (obtén en console.groq.com/keys)
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ===================================
# CLIP SERVICE CONFIGURATION
# ===================================
# URL del servicio Python CLIP
CLIP_SERVICE_URL=http://localhost:5000

# ===================================
# SERVER CONFIGURATION
# ===================================
# Puerto del servidor Node.js
PORT=3000

# Ambiente (development, production)
NODE_ENV=development
```

### 2. Configurar MongoDB Atlas Vector Search

**⚠️ IMPORTANTE**: Vector Search requiere cluster M10 o superior (no funciona en M0 gratuito)

#### 2.1 Crear el Índice de Vector Search

1. Inicia sesión en [MongoDB Atlas](https://cloud.mongodb.com)
2. Selecciona tu cluster
3. Ve a la pestaña **"Search"**
4. Haz clic en **"Create Search Index"**
5. Selecciona **"JSON Editor"**
6. Configura:
   - **Index Name**: `vector_search_index`
   - **Database**: `agencia_viajes_rag`
   - **Collection**: `media`

7. Pega esta configuración JSON:

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

8. Haz clic en **"Create Search Index"**
9. Espera a que el estado sea **"Active"** (5-10 minutos)

📖 **Documentación detallada**: Ver `docs/ATLAS_VECTOR_SEARCH_SETUP.md`

### 3. Whitelist de IP en MongoDB Atlas

1. En Atlas, ve a **Network Access**
2. Haz clic en **"Add IP Address"**
3. Opciones:
   - **Desarrollo local**: "Add Current IP Address"
   - **Acceso desde cualquier lugar**: `0.0.0.0/0` (⚠️ no recomendado para producción)

## 🎮 Uso

### Iniciar el Sistema (2 terminales)

#### Terminal 1: Servicio CLIP (Python)

```bash
cd python
python clip_service.py
```

**Salida esperada:**
```
🔄 Cargando modelo CLIP...
✅ Modelo CLIP cargado exitosamente
📱 Usando dispositivo: cpu
 * Running on http://0.0.0.0:5000
```

⏱️ **Nota**: La primera vez tardará 1-2 minutos descargando el modelo CLIP (~500MB)

#### Terminal 2: API Node.js

```bash
npm start
```

**Salida esperada:**
```
✅ Conectado a MongoDB
✅ Conectado a MongoDB Atlas para RAG
🚀 Servidor corriendo en http://localhost:3000
```

### Verificar que Todo Funciona

```bash
# Health check del servicio CLIP
curl http://localhost:5000/health

# Health check de la API principal
curl http://localhost:3000/health
```

## 📡 API Endpoints

### RAG Endpoints (Sistema Multimodal)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/rag/upload` | Subir imagen con metadatos |
| `POST` | `/api/rag/query` | Búsqueda con RAG (texto → imágenes + LLM) |
| `GET` | `/api/rag/similar/:id` | Buscar imágenes similares |
| `GET` | `/api/rag/images` | Listar todas las imágenes |
| `GET` | `/api/rag/image/:id` | Obtener imagen por ID |
| `DELETE` | `/api/rag/image/:id` | Eliminar imagen |
| `GET` | `/api/rag/stats` | Estadísticas del sistema |

### Gestión de Agencia (CRUD Completo)

- `/api/clientes` - Gestión de clientes
- `/api/viajes` - Gestión de viajes
- `/api/reservas` - Gestión de reservas
- `/api/hoteles` - Gestión de hoteles
- `/api/actividades-turisticas` - Actividades
- `/api/guias` - Gestión de guías
- Y más... (ver `docs/GUIA_USO_RAG.md`)

### Ejemplos de Uso

#### 1. Subir una Imagen

```bash
curl -X POST http://localhost:3000/api/rag/upload \
  -F "image=@./path/to/playa.jpg" \
  -F "title=Playa de Cartagena" \
  -F "category=destinos" \
  -F "tags=playa,colombia,caribe" \
  -F "caption=Hermosa playa caribeña con arena blanca"
```

#### 2. Búsqueda Semántica con RAG

```bash
curl -X POST http://localhost:3000/api/rag/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "playas paradisíacas para luna de miel",
    "k": 5,
    "includeAnswer": true
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "query": "playas paradisíacas para luna de miel",
  "totalResults": 5,
  "results": [
    {
      "_id": "abc123",
      "title": "Hotel Boutique Colonial",
      "category": "hotel",
      "score": 0.6234,
      "caption": "Hotel boutique con arquitectura colonial..."
    }
  ],
  "answer": "¡Claro! Te recomiendo los siguientes destinos..."
}
```

#### 3. Búsqueda con Filtros Híbridos

```bash
curl -X POST http://localhost:3000/api/rag/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "hoteles de lujo con vista al mar",
    "category": "hotel",
    "tags": ["lujo", "cinco-estrellas"],
    "k": 5
  }'
```

#### 4. Buscar Imágenes Similares

```bash
curl http://localhost:3000/api/rag/similar/692f19f62a35c67397d10c96?k=5
```

## 🧪 Casos de Prueba

### Ejecutar Todos los Casos de Prueba

```bash
npm run test-cases
```

Esto ejecutará los 5 casos de prueba obligatorios:

1. ✅ **Búsqueda Semántica**: "destinos paradisíacos para luna de miel..."
2. ✅ **Filtros Híbridos**: Categoría + tags específicos
3. ✅ **Búsqueda Multimodal**: Imágenes similares
4. ✅ **RAG Complejo**: Pregunta abierta con recomendaciones
5. ✅ **Búsqueda de Actividades**: "actividades extremas..."

**Resultados esperados:**
- ✅ Tiempo de respuesta: 188ms - 1047ms
- ✅ Precisión: 57% - 80%
- ✅ Respuestas LLM coherentes

### Cargar Imágenes de Ejemplo

```bash
npm run load-images
```

Esto cargará 15+ imágenes de ejemplo en el sistema.

## 📚 Documentación

### Documentos Principales

| Documento | Descripción |
|-----------|-------------|
| **`docs/INFORME_FINAL.md`** | 📊 Informe completo del proyecto (Entrega 2) |
| **`docs/METRICAS_Y_RESULTADOS.md`** | 📈 Métricas detalladas y análisis de resultados |
| **`docs/COMPARACION_RELACIONAL.md`** | 🔄 Comparación SQL vs NoSQL |
| **`docs/LECCIONES_APRENDIDAS.md`** | 🎓 Lecciones técnicas del desarrollo |
| **`docs/GUIA_USO_RAG.md`** | 📖 Guía de uso del sistema RAG |
| **`docs/ATLAS_VECTOR_SEARCH_SETUP.md`** | ⚙️ Configuración de Vector Search |

### Colección Postman

```bash
# Importar en Postman
postman/RAG_API_Collection.json
```

Incluye:
- ✅ 20+ requests pre-configurados
- ✅ Variables de entorno
- ✅ Ejemplos de respuestas
- ✅ Tests automáticos

## 🔧 Troubleshooting

### Problema: "CLIP Service no responde"

**Síntomas:**
```
Error: connect ECONNREFUSED 127.0.0.1:5000
```

**Solución:**
1. Verifica que el servicio CLIP esté corriendo:
   ```bash
   curl http://localhost:5000/health
   ```
2. Si no responde, reinicia:
   ```bash
   cd python
   python clip_service.py
   ```

### Problema: "Index not found" en MongoDB

**Síntomas:**
```
MongoServerError: $vectorSearch could not find index 'vector_search_index'
```

**Solución:**
1. Verifica que el índice exista en Atlas (pestaña "Search")
2. Estado debe ser "Active"
3. Confirma que `VECTOR_INDEX_NAME` en `.env` coincide con el nombre en Atlas
4. Espera 5-10 minutos si recién creaste el índice

### Problema: "Dimension mismatch"

**Síntomas:**
```
Error: Vector dimension mismatch. Expected 512, got 768
```

**Solución:**
- Verifica que `numDimensions: 512` en el índice de Atlas
- El modelo CLIP debe ser `openai/clip-vit-base-patch32` (no `large`)

### Problema: Tiempos de respuesta lentos (>5s)

**Causas posibles:**
1. **Primera consulta**: CLIP carga modelo en memoria (~2-3s)
2. **CPU lento**: CLIP sin GPU puede tardar más
3. **Groq rate limit**: Espera 1 minuto y reintenta

**Soluciones:**
- ✅ Usar GPU si está disponible
- ✅ Mantener CLIP service corriendo (no reiniciar)
- ✅ Implementar caché para queries frecuentes

### Problema: "No results found"

**Causas:**
1. Índice vectorial no construido completamente
2. No hay imágenes en la base de datos
3. Filtros muy restrictivos

**Solución:**
```bash
# Cargar imágenes de ejemplo
npm run load-images

# Verificar cantidad de documentos
curl http://localhost:3000/api/rag/stats
```

### Problema: Errores de memoria en Python

**Síntomas:**
```
RuntimeError: [enforce fail at alloc_cpu.cpp:64] . DefaultCPUAllocator: can't allocate memory
```

**Solución:**
1. Cerrar otras aplicaciones
2. Aumentar swap del sistema
3. Usar batch size más pequeño

## 🏗️ Arquitectura

### Stack Tecnológico

```
Frontend (Futuro)
    ↓
┌─────────────────────────────────┐
│   API REST (Node.js + Express)  │
│   - Controllers                 │
│   - Services                    │
│   - Routes                      │
└────────┬────────────────────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌────────┐ ┌──────────────────┐
│ Python │ │  MongoDB Atlas   │
│  CLIP  │ │  - Vector Search │
│ Service│ │  - GridFS        │
└────────┘ │  - Collections   │
           └──────────────────┘
         │
         ↓
    ┌─────────┐
    │  Groq   │
    │  LLM    │
    └─────────┘
```

### Flujo de Datos RAG

```
User Query → CLIP Embedding → Vector Search → Context Building → LLM → Response
    ↓             ↓                ↓                ↓              ↓        ↓
  "playas"    [0.1,0.2...]     Top 5 docs      Structured     Groq   Natural
 romanticas                                     prompt                answer
```

### Modelado de Datos

**Colección `media` (RAG):**
```javascript
{
  _id: ObjectId,
  title: String,
  category: String,  // destinos, hoteles, actividades
  tags: [String],
  caption: String,
  image_file_id: ObjectId,  // → GridFS
  image_embedding: [Float],  // 512 dimensiones
  metadata: Object
}
```

**GridFS (`fs.files` y `fs.chunks`):**
- Almacena imágenes binarias
- Chunks de 255KB
- Metadata incluida

## 🧩 Estructura del Proyecto

```
NoSQL-travel-agency-project/
├── docs/                    # 📚 Documentación completa
│   ├── INFORME_FINAL.md
│   ├── METRICAS_Y_RESULTADOS.md
│   └── ...
├── src/                     # 💻 Código Node.js
│   ├── index.js            # Entry point
│   ├── config/             # Configuración
│   ├── models/             # Modelos Mongoose
│   ├── controllers/        # Controladores
│   ├── services/           # Lógica de negocio
│   ├── routes/             # Rutas Express
│   └── rag/                # Pipeline RAG
├── python/                  # 🐍 Servicio CLIP
│   ├── clip_service.py
│   └── requirements.txt
├── scripts/                 # 🔧 Scripts útiles
│   ├── load-sample-images.js
│   └── test-cases.js
├── postman/                 # 📮 Colección Postman
├── uploads/temp/            # 📁 Archivos temporales
├── package.json             # Dependencias Node
├── .env                     # Variables de entorno
└── README.md               # Este archivo
```

## 🤝 Contribución

### Desarrollo Local

```bash
# Instalar en modo desarrollo
npm install

# Ejecutar con auto-reload
npm run dev

# Ejecutar tests
npm test

# Linting
npm run lint
```

### Convenciones de Código

- **JavaScript**: ESLint con estándar Airbnb
- **Python**: PEP 8
- **Commits**: Conventional Commits

## 📄 Licencia

Este proyecto es parte del curso de **Bases de Datos No Relacionales** de la **Universidad de Caldas**.

## 👥 Autores

- **Alan** - Desarrollo completo del sistema
- **Universidad de Caldas** - Institución educativa

## 🙏 Agradecimientos

- MongoDB Atlas por Vector Search
- Hugging Face por CLIP model
- Groq por API gratuita de LLM
- OpenAI por el modelo CLIP original

## 📞 Soporte

- **Documentación**: Ver carpeta `docs/`
- **Issues**: Crear issue en el repositorio
- **Email**: [tu-email@ejemplo.com]

---

## 🚀 Quick Start (TL;DR)

```bash
# 1. Instalar
npm install
cd python && pip install -r requirements.txt && cd ..

# 2. Configurar .env
cp .env.example .env
# Editar con tus credenciales

# 3. Configurar Vector Search en Atlas
# (Ver sección "Configuración")

# 4. Iniciar CLIP (Terminal 1)
cd python && python clip_service.py

# 5. Iniciar API (Terminal 2)
npm start

# 6. Cargar imágenes de prueba
npm run load-images

# 7. Ejecutar casos de prueba
npm run test-cases
```

---

**✨ Sistema listo para la Entrega 2 del Proyecto Final ✨**

**Fecha:** Diciembre 2, 2025  
**Versión:** 1.0  
**Estado:** ✅ Producción-Ready

