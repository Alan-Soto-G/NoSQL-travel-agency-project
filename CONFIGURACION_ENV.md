# Guía de Configuración del Archivo .env

Esta guía explica cada variable de configuración del archivo `.env` y cómo configurarlo correctamente.

---

## 🗄️ Configuraciones de MongoDB

### 1. `MONGODB_URI`

```env
MONGODB_URI=mongodb://localhost:27017/agencia_viajes
```

**¿Qué es?** Conexión a MongoDB **local** (instalado en tu computadora)

**¿Para qué?** Tu proyecto ORIGINAL usa esta conexión con Mongoose para las operaciones normales (clientes, reservas, hoteles, etc.)

**❓ ¿Es necesario?**

- **SÍ**, si quieres mantener tu proyecto existente funcionando
- **NO**, si solo quieres usar el sistema RAG

**✅ Solución solo con Atlas:**
Puedes reemplazarla con tu URI de Atlas:

```env
MONGODB_URI=mongodb+srv://alan:alan123@agencia.hp1x6a9.mongodb.net/agencia_viajes?appName=agencia
```

---

### 2. `MONGODB_ATLAS_URI`

```env
MONGODB_ATLAS_URI=mongodb+srv://alan:alan123@agencia.hp1x6a9.mongodb.net/?appName=agencia
```

**¿Qué es?** Conexión a MongoDB **Atlas** (en la nube)

**¿Para qué?** El sistema RAG usa esta conexión con MongoClient (no Mongoose) porque necesita:

- **GridFS**: Almacenar imágenes binarias
- **Vector Search**: Búsqueda vectorial avanzada

**❓ ¿Es necesario?** **SÍ** - Es obligatorio para el sistema RAG

**⚠️ Importante**: Ya la tienes configurada correctamente

---

## 🗃️ Configuraciones del Sistema RAG

### 3. `RAG_DB_NAME`

```env
RAG_DB_NAME=agencia_viajes_rag
```

**¿Qué es?** Nombre de la **base de datos** donde se guardarán las imágenes y embeddings del RAG

**¿Por qué separada?** Para no mezclar datos del RAG con tus datos normales (clientes, reservas, etc.)

**Estructura:**

- `agencia_viajes` → Tu proyecto original (clientes, hoteles, reservas...)
- `agencia_viajes_rag` → Sistema RAG (imágenes, embeddings, búsquedas)

---

### 4. `VECTOR_INDEX_NAME`

```env
VECTOR_INDEX_NAME=vector_search_index
```

**¿Qué es?** Nombre del **índice de búsqueda vectorial** en MongoDB Atlas

**¿Para qué?** Permite hacer búsquedas semánticas tipo "playas paradisíacas" y encontrar imágenes relacionadas

**📝 Nota**: Este nombre debe coincidir con el que crees en la interfaz de Atlas (ver `docs/ATLAS_VECTOR_SEARCH_SETUP.md`)

---

## 🤖 Configuración de Inteligencia Artificial

### 5. `GROQ_API_KEY`

```env
GROQ_API_KEY=tu_groq_api_key_aqui
```

**¿Qué es?** Clave de API para usar **Groq** (servicio de LLM/IA)

**¿Para qué?** Generar respuestas en lenguaje natural basadas en las imágenes encontradas

**Ejemplo de uso:**

- Usuario pregunta: _"¿Qué playas recomiendas para luna de miel?"_
- RAG busca imágenes de playas
- Groq genera respuesta: _"Basándome en las imágenes, te recomiendo Cartagena porque..."_

**🔑 Cómo obtenerla:**

1. Ve a https://console.groq.com/keys
2. Crea una cuenta gratis
3. Genera una API key
4. Reemplaza `tu_groq_api_key_aqui` con tu key real

---

### 6. `CLIP_SERVICE_URL`

```env
CLIP_SERVICE_URL=http://localhost:5000
```

**¿Qué es?** URL del servicio **Python CLIP** que genera embeddings

**¿Para qué?**

- Convertir imágenes a vectores numéricos (512 números)
- Convertir texto a vectores numéricos
- Permite comparar similaridad entre imagen-texto e imagen-imagen

**🐍 Importante**: Debes ejecutar el servicio Python:

```powershell
cd python
python clip_service.py
```

---

## ⚙️ Configuración del Servidor

### 7. `PORT`

```env
PORT=3000
```

**¿Qué es?** Puerto donde correrá tu API de Node.js

**Por defecto**: http://localhost:3000

---

### 8. `NODE_ENV`

```env
NODE_ENV=development
```

**¿Qué es?** Ambiente de ejecución

**Valores:**

- `development`: Para desarrollo (más logs, sin optimizaciones)
- `production`: Para producción (optimizado, menos logs)

---

## 📊 Resumen Visual

```
┌─────────────────────────────────────────┐
│  TU PROYECTO ORIGINAL                   │
│  ├─ MONGODB_URI                         │
│  │  └─ mongodb://localhost O Atlas      │
│  │     (clientes, reservas, hoteles...) │
│  └─ PORT: 3000                          │
└─────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────┐
│  SISTEMA RAG (NUEVO)                    │
│  ├─ MONGODB_ATLAS_URI                   │
│  │  └─ Conexión a Atlas (GridFS + Vec)  │
│  ├─ RAG_DB_NAME                         │
│  │  └─ agencia_viajes_rag               │
│  ├─ VECTOR_INDEX_NAME                   │
│  │  └─ Índice para búsquedas            │
│  ├─ GROQ_API_KEY                        │
│  │  └─ IA para respuestas               │
│  └─ CLIP_SERVICE_URL                    │
│     └─ Python en puerto 5000            │
└─────────────────────────────────────────┘
```

---

## ✅ Configuración Recomendada SOLO con Atlas

Si NO tienes MongoDB local y solo quieres usar Atlas:

```env
# Usa Atlas para TODO
MONGODB_URI=mongodb+srv://alan:alan123@agencia.hp1x6a9.mongodb.net/agencia_viajes?appName=agencia

# RAG con Atlas (ya la tienes bien)
MONGODB_ATLAS_URI=mongodb+srv://alan:alan123@agencia.hp1x6a9.mongodb.net/?appName=agencia
RAG_DB_NAME=agencia_viajes_rag
VECTOR_INDEX_NAME=vector_search_index

# Groq (obtén tu key)
GROQ_API_KEY=gsk_tu_key_real_aqui

# CLIP (puerto local Python)
CLIP_SERVICE_URL=http://localhost:5000

# Servidor
PORT=3000
NODE_ENV=development
```

---

## 🚀 Pasos para Configurar

### 1. Crear archivo .env

```powershell
# En la raíz del proyecto
copy .env.example .env
```

### 2. Editar .env con tus credenciales

Abre el archivo `.env` y reemplaza:

```env
# Cambia esto:
MONGODB_URI=mongodb://localhost:27017/agencia_viajes

# Por esto (usando Atlas):
MONGODB_URI=mongodb+srv://alan:alan123@agencia.hp1x6a9.mongodb.net/agencia_viajes?appName=agencia
```

```env
# Cambia esto:
GROQ_API_KEY=tu_groq_api_key_aqui

# Por tu key real de Groq:
GROQ_API_KEY=gsk_abc123xyz456...
```

### 3. Obtener Groq API Key

1. Ve a https://console.groq.com/
2. Regístrate o inicia sesión
3. Ve a la sección **API Keys**
4. Haz clic en **Create API Key**
5. Copia la key generada
6. Pégala en tu archivo `.env`

### 4. Instalar dependencias Python

```powershell
cd python
pip install -r requirements.txt
```

### 5. Crear índice en MongoDB Atlas

Sigue la guía en `docs/ATLAS_VECTOR_SEARCH_SETUP.md` para crear el índice vectorial.

---

## ⚠️ Notas Importantes

### Seguridad

- **NUNCA** subas el archivo `.env` a Git
- El archivo `.gitignore` ya incluye `.env`
- Solo comparte `.env.example` (sin credenciales reales)

### Bases de Datos

- Puedes usar **la misma conexión de Atlas** para ambas variables si quieres
- El sistema creará **dos bases de datos** en el mismo cluster:
  - `agencia_viajes` → Datos originales
  - `agencia_viajes_rag` → Sistema RAG

### Requisitos de MongoDB Atlas

- **Cluster M10 o superior** para Vector Search
- Los clusters gratuitos (M0) **NO soportan** búsqueda vectorial
- MongoDB 6.0.11 o superior

---

## 🔧 Troubleshooting

### Error: "MONGODB_URI not defined"

**Solución**: Asegúrate de haber creado el archivo `.env` (no uses `.env.example`)

### Error: "Groq API key invalid"

**Solución**: Verifica que copiaste la key completa, empieza con `gsk_`

### Error: "CLIP service unavailable"

**Solución**: Ejecuta el servicio Python:

```powershell
cd python
python clip_service.py
```

### Error: "Vector search not supported"

**Solución**: Necesitas un cluster M10+ en MongoDB Atlas, los clusters gratuitos no funcionan

---

## 📚 Recursos Adicionales

- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Groq Console](https://console.groq.com/)
- [CLIP Model](https://huggingface.co/openai/clip-vit-base-patch32)
- Documentación completa: `README_RAG.md`
- Configuración de índice: `docs/ATLAS_VECTOR_SEARCH_SETUP.md`

---

**Resultado**: Todo funcionará solo con Atlas, sin necesidad de instalar MongoDB localmente.
