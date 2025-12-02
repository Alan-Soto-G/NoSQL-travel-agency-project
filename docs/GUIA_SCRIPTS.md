# Guía de Uso - Scripts de Prueba

Esta guía explica cómo usar los scripts de carga de datos y pruebas del sistema RAG.

---

## 📋 Requisitos Previos

Antes de ejecutar los scripts, asegúrate de tener:

1. ✅ Servicios corriendo:

   ```powershell
   # Terminal 1: Servicio Python CLIP
   npm run clip-service

   # Terminal 2: Servidor Node.js
   npm start
   ```

2. ✅ Variables de entorno configuradas en `.env`:

   - `MONGODB_ATLAS_URI`
   - `GROQ_API_KEY`
   - `RAG_DB_NAME`
   - `VECTOR_INDEX_NAME`

3. ✅ Índice vectorial creado en MongoDB Atlas (ver `docs/ATLAS_VECTOR_SEARCH_SETUP.md`)

---

## 🚀 Scripts Disponibles

### 1. Cargar Imágenes de Ejemplo

**Comando:**

```powershell
npm run load-samples
```

**¿Qué hace?**

- Descarga 15 imágenes de ejemplo de diferentes categorías
- Genera embeddings usando CLIP
- Sube las imágenes al sistema RAG con metadatos

**Categorías incluidas:**

- 🏖️ Destinos (3 playas e islas tropicales)
- 🏨 Hoteles (3 hoteles de lujo y resorts)
- 🏄 Actividades (3 deportes y aventuras)
- 🍽️ Gastronomía (2 restaurantes)
- 💒 Eventos (2 bodas y corporativos)
- 🚤 Transporte (2 vehículos)

**Salida esperada:**

```
🚀 Iniciando carga de imágenes de ejemplo...

[1/15] Procesando: Playa del Carmen - Caribe Mexicano
  📥 Descargando imagen...
  📤 Subiendo al sistema RAG...
  ✅ Éxito - ID: 507f1f77bcf86cd799439011
  📊 Embedding generado: 512 dimensiones

...

📊 RESUMEN DE CARGA
✅ Exitosas: 15
❌ Fallidas: 0
📈 Total: 15
🎯 Tasa de éxito: 100.0%
```

**Tiempo estimado:** 1-2 minutos

---

### 2. Ejecutar Casos de Prueba

**Comando:**

```powershell
npm run test-cases
```

**¿Qué hace?**

- Ejecuta los 4 casos de prueba obligatorios + 1 adicional
- Mide tiempos de respuesta
- Muestra resultados detallados
- Genera reporte de métricas

**Casos de prueba incluidos:**

#### Caso 1: Búsqueda Semántica

```
Query: "destinos paradisíacos para luna de miel con playas de arena blanca"
Tipo: Búsqueda vectorial con respuesta LLM
```

#### Caso 2: Filtros Híbridos

```
Query: "hoteles de lujo con vista al mar"
Filtros: category=hoteles, tags=lujo,cinco-estrellas
Tipo: Búsqueda vectorial + filtros de metadatos
```

#### Caso 3: Búsqueda Multimodal

```
Tipo: Búsqueda de imágenes similares (imagen → imagen)
Encuentra imágenes visualmente similares a una de referencia
```

#### Caso 4: RAG Complejo

```
Query: "¿Cuáles son las mejores opciones para un viaje romántico en pareja?"
Tipo: Consulta compleja con múltiples contextos + LLM
```

#### Caso 5: Actividades (Adicional)

```
Query: "actividades extremas y deportes acuáticos emocionantes"
Filtros: category=actividades
```

**Salida esperada:**

```
🧪 EJECUTANDO CASOS DE PRUEBA OBLIGATORIOS

================================================================================
CASO DE PRUEBA 1: Búsqueda Semántica
================================================================================
📝 Query: destinos paradisíacos para luna de miel con playas de arena blanca
⏱️  Tiempo de respuesta: 1250ms
📊 Resultados encontrados: 3

🔍 Top 3 resultados:

  1. Playa del Carmen - Caribe Mexicano
     📂 Categoría: destinos
     🏷️  Tags: playa, caribe, mexico, arena-blanca
     📈 Score: 0.8765
     💬 Hermosa playa de arena blanca con aguas cristalinas...

🤖 Respuesta del LLM:
Basándome en las imágenes encontradas, te recomiendo...

================================================================================

📊 REPORTE DE MÉTRICAS DE RENDIMIENTO
⏱️  Tiempo de respuesta promedio: 1350.25ms
⚡ Tiempo de respuesta mínimo: 850ms
🐌 Tiempo de respuesta máximo: 2100ms
📊 Total de resultados encontrados: 23
📈 Promedio de resultados por query: 4.60
🎯 Precisión (queries con resultados): 100.0%
```

**Tiempo estimado:** 1-2 minutos

---

## 📊 Métricas de Rendimiento

El script de casos de prueba genera automáticamente:

| Métrica                 | Descripción                              |
| ----------------------- | ---------------------------------------- |
| **Tiempo de respuesta** | Milisegundos desde envío hasta recepción |
| **Total de resultados** | Cantidad de documentos encontrados       |
| **Score de similitud**  | Valor entre 0-1 (cosine similarity)      |
| **Precisión**           | % de queries que retornan resultados     |

---

## 🎯 Casos de Uso para Evidencias

### Para el Informe Final

1. **Ejecutar carga de datos:**

   ```powershell
   npm run load-samples
   ```

   📸 Captura de pantalla del resumen de carga

2. **Ejecutar casos de prueba:**

   ```powershell
   npm run test-cases
   ```

   📸 Capturas de cada caso de prueba
   📸 Captura del reporte de métricas

3. **Verificar en MongoDB Atlas:**

   - Ve a tu cluster → Collections → `agencia_viajes_rag` → `media`
     📸 Captura de los documentos almacenados

4. **Probar API manualmente (opcional):**

   ```powershell
   # Listar imágenes
   curl http://localhost:3000/api/rag/images?limit=5

   # Búsqueda simple
   curl "http://localhost:3000/api/rag/search?query=playa&k=3"
   ```

---

## 🔧 Solución de Problemas

### Error: "CLIP service unavailable"

**Solución:**

```powershell
# Verifica que el servicio Python esté corriendo
npm run clip-service
```

### Error: "API connection failed"

**Solución:**

```powershell
# Verifica que el servidor Node.js esté corriendo
npm start
```

### Error: "Vector search index not found"

**Solución:**

1. Ve a MongoDB Atlas
2. Crea el índice vectorial (ver `docs/ATLAS_VECTOR_SEARCH_SETUP.md`)
3. Espera a que el estado sea "Active"

### Imágenes no se cargan

**Solución:**

- Verifica tu conexión a internet (el script descarga imágenes de picsum.photos)
- Revisa que el directorio `test-data/temp` tenga permisos de escritura

### Sin resultados en casos de prueba

**Solución:**

1. Primero ejecuta `npm run load-samples`
2. Espera a que se complete
3. Luego ejecuta `npm run test-cases`

---

## 📁 Estructura de Archivos Generados

```
NoSQL-travel-agency-project/
├── test-data/
│   └── temp/              # Imágenes temporales (se limpian automáticamente)
├── scripts/
│   ├── load-sample-images.js    # Script de carga
│   └── test-cases.js            # Script de pruebas
└── package.json           # Scripts npm configurados
```

---

## 🎓 Para el Informe Final

### Evidencias Requeridas

1. **Screenshots de ejecución:**

   - ✅ Carga de imágenes exitosa
   - ✅ Caso 1: Búsqueda semántica
   - ✅ Caso 2: Filtros híbridos
   - ✅ Caso 3: Búsqueda multimodal
   - ✅ Caso 4: RAG complejo
   - ✅ Reporte de métricas

2. **Datos para el informe:**

   - Tiempo promedio de respuesta: \_\_\_ ms
   - Precisión del sistema: \_\_\_ %
   - Total de documentos procesados: 15
   - Dimensiones de embeddings: 512
   - Modelo usado: CLIP vit-base-patch32
   - LLM usado: Groq Llama 3.1

3. **Capturas de MongoDB Atlas:**
   - Colección `media` con documentos
   - Índice `vector_search_index` activo
   - Ejemplo de documento con embedding

---

## ✨ Próximos Pasos

Después de ejecutar los scripts:

1. ✅ Revisar resultados y capturas
2. ✅ Documentar métricas en informe
3. ✅ Crear colección Postman (opcional)
4. ✅ Preparar presentación/demo
5. ✅ Completar informe final

---

**Nota**: Los scripts usan imágenes de demostración de Picsum Photos. Para producción, deberías subir imágenes reales de tu agencia de viajes.
