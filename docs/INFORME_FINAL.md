# Informe Final - Sistema RAG Multimodal

## Proyecto Final - Bases de Datos No Relacionales

**Institución:** Universidad de Caldas  
**Curso:** Bases de Datos No Relacionales  
**Semestre:** 2025-2  
**Estudiante(s):** [COMPLETAR]  
**Fecha:** [COMPLETAR]

---

## 📋 Tabla de Contenidos

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Introducción](#2-introducción)
3. [Arquitectura Técnica](#3-arquitectura-técnica)
4. [Implementación](#4-implementación)
5. [Resultados y Evaluación](#5-resultados-y-evaluación)
6. [Casos de Uso y Pruebas](#6-casos-de-uso-y-pruebas)
7. [Comparación con Enfoque Relacional](#7-comparación-con-enfoque-relacional)
8. [Lecciones Aprendidas](#8-lecciones-aprendidas)
9. [Conclusiones y Recomendaciones](#9-conclusiones-y-recomendaciones)
10. [Referencias](#10-referencias)

---

## 1. Resumen Ejecutivo

### Objetivo del Proyecto

[COMPLETAR: Describir el objetivo general del sistema RAG implementado]

### Tecnologías Utilizadas

- **Base de Datos:** MongoDB Atlas 7.0+ con Vector Search
- **Modelo de Embeddings:** CLIP (openai/clip-vit-base-patch32) - 512 dimensiones
- **LLM:** Groq API con Llama 3.1 8B Instant
- **Backend:** Node.js + Express
- **Servicio ML:** Python + Flask + Transformers
- **Almacenamiento:** GridFS para archivos binarios

### Resultados Principales

- ✅ Sistema RAG funcional con búsqueda multimodal
- ✅ [COMPLETAR métricas principales]
- ✅ [COMPLETAR logros destacados]

---

## 2. Introducción

### 2.1 Contexto

[COMPLETAR: Explicar el contexto de una agencia de viajes y la necesidad de búsqueda semántica]

### 2.2 Problema a Resolver

[COMPLETAR: Describir los desafíos de búsqueda tradicional vs semántica]

### 2.3 Alcance del Proyecto

**Incluye:**

- Pipeline RAG completo (ingesta, embeddings, almacenamiento, recuperación)
- Búsqueda vectorial con MongoDB Atlas Vector Search
- Integración con LLM para generación de respuestas
- API REST documentada
- Casos de prueba obligatorios

**No incluye:**

- Interfaz gráfica de usuario
- Autenticación y autorización
- Sistema de caché
- Optimizaciones avanzadas de producción

---

## 3. Arquitectura Técnica

### 3.1 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENTE                             │
│              (Postman / cURL / Frontend)                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    API REST (Express)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Controllers  │  │   Routes     │  │  Validators  │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                           │                                 │
│  ┌────────────────────────┴─────────────────────────┐      │
│  │              CAPA DE SERVICIOS                   │      │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │      │
│  │  │ Storage  │  │  Search  │  │   LLM    │       │      │
│  │  │ Service  │  │ Service  │  │ Service  │       │      │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘       │      │
│  └───────┼─────────────┼─────────────┼─────────────┘      │
└──────────┼─────────────┼─────────────┼────────────────────┘
           │             │             │
           ▼             ▼             ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Python    │  │  MongoDB    │  │  Groq API   │
│    CLIP     │  │   Atlas     │  │  (Llama)    │
│  Service    │  │             │  │             │
│             │  │ ┌─────────┐ │  │             │
│ Embeddings  │  │ │GridFS   │ │  │  LLM Gen    │
│ Generator   │  │ │Images   │ │  │  Answers    │
│             │  │ └─────────┘ │  │             │
│             │  │ ┌─────────┐ │  │             │
│             │  │ │Vector   │ │  │             │
│             │  │ │Search   │ │  │             │
│             │  │ └─────────┘ │  │             │
└─────────────┘  └─────────────┘  └─────────────┘
```

### 3.2 Componentes Principales

#### 3.2.1 API REST (Node.js + Express)

- **Propósito:** [COMPLETAR]
- **Endpoints:** 8 endpoints principales
- **Responsabilidades:** [COMPLETAR]

#### 3.2.2 Servicio CLIP (Python + Flask)

- **Modelo:** openai/clip-vit-base-patch32
- **Dimensiones:** 512
- **Función:** Generar embeddings multimodales (texto e imagen)

#### 3.2.3 MongoDB Atlas

- **Base de Datos:** `agencia_viajes_rag`
- **Colecciones:**
  - `media`: Metadatos y embeddings
  - `fs.files`, `fs.chunks`: GridFS para imágenes binarias
- **Índice Vectorial:** `vector_search_index` (cosine similarity)

#### 3.2.4 Groq LLM

- **Modelo:** llama-3.1-8b-instant
- **Uso:** Generación de respuestas contextualizadas
- **Ventaja:** API gratuita con cuota generosa

### 3.3 Flujo de Datos

#### Flujo de Ingesta (Upload)

```
1. Cliente → Upload imagen + metadatos
2. API → Guarda imagen temporal
3. API → Envía imagen a CLIP Service
4. CLIP → Genera embedding (512 dims)
5. API → Sube imagen a GridFS
6. API → Guarda documento en colección media
7. MongoDB → Indexa embedding automáticamente
```

#### Flujo de Búsqueda (Query)

```
1. Cliente → Envía query de texto
2. API → Envía texto a CLIP Service
3. CLIP → Genera embedding del texto
4. API → Ejecuta $vectorSearch en MongoDB
5. MongoDB → Retorna documentos similares
6. API → Construye contexto
7. API → Envía contexto a Groq
8. Groq → Genera respuesta
9. API → Retorna resultados + respuesta
```

---

## 4. Implementación

### 4.1 Modelo de Datos

#### Documento Media

```json
{
  "_id": ObjectId,
  "title": "Playa de Cartagena",
  "category": "destinos",
  "tags": ["playa", "colombia", "caribe"],
  "caption": "Hermosa playa caribeña...",
  "image_file_id": ObjectId("..."),  // GridFS
  "image_embedding": [0.123, -0.456, ...],  // 512 floats
  "related_entity_id": "hotel_123",
  "metadata": {
    "contentType": "image/jpeg",
    "size": 245678
  },
  "created_at": ISODate("2025-12-02T..."),
  "updated_at": ISODate("2025-12-02T...")
}
```

### 4.2 Configuración del Índice Vectorial

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

### 4.3 Pipeline de Vector Search

```javascript
db.media.aggregate([
  {
    $vectorSearch: {
      index: "vector_search_index",
      path: "image_embedding",
      queryVector: [...],  // 512 floats
      numCandidates: 100,
      limit: 5,
      filter: {
        category: { $eq: "destinos" }
      }
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

### 4.4 Prompt Engineering

[COMPLETAR: Explicar cómo construyes el prompt para el LLM]

Ejemplo de prompt:

```
Eres un asistente de una agencia de viajes. Basándote en las siguientes imágenes y
descripciones, responde la pregunta del usuario de manera útil y amigable.

CONTEXTO:
1. Playa de Cartagena - Hermosa playa caribeña...
2. Hotel Gran Caribe - Suite presidencial...
...

PREGUNTA: ¿Cuáles son las mejores playas para luna de miel?

RESPUESTA:
```

---

## 5. Resultados y Evaluación

### 5.1 Métricas de Rendimiento

[COMPLETAR después de ejecutar `npm run test-cases`]

| Métrica                                | Valor     | Observaciones         |
| -------------------------------------- | --------- | --------------------- |
| **Tiempo de respuesta promedio**       | \_\_\_ ms | [COMPLETAR]           |
| **Tiempo de respuesta mínimo**         | \_\_\_ ms | [COMPLETAR]           |
| **Tiempo de respuesta máximo**         | \_\_\_ ms | [COMPLETAR]           |
| **Precisión (queries con resultados)** | \_\_\_%   | [COMPLETAR]           |
| **Total de documentos procesados**     | 15        | Imágenes de ejemplo   |
| **Dimensión de embeddings**            | 512       | CLIP vit-base-patch32 |
| **Similitud usada**                    | Cosine    | MongoDB Atlas         |

### 5.2 Análisis de Resultados

[COMPLETAR]

**Fortalezas:**

- [COMPLETAR basado en tus observaciones]

**Debilidades:**

- [COMPLETAR basado en tus observaciones]

---

## 6. Casos de Uso y Pruebas

### 6.1 Caso de Prueba 1: Búsqueda Semántica

**Query:** "destinos paradisíacos para luna de miel con playas de arena blanca"

**Resultados:**
[COMPLETAR después de ejecutar test-cases.js]

**Screenshot:**
[INSERTAR CAPTURA]

**Análisis:**
[COMPLETAR: ¿Los resultados fueron relevantes? ¿El score de similitud fue alto?]

---

### 6.2 Caso de Prueba 2: Filtros Híbridos

**Query:** "hoteles de lujo con vista al mar"  
**Filtros:** category=hoteles, tags=lujo,cinco-estrellas

**Resultados:**
[COMPLETAR]

**Screenshot:**
[INSERTAR CAPTURA]

**Análisis:**
[COMPLETAR: ¿Los filtros funcionaron correctamente?]

---

### 6.3 Caso de Prueba 3: Búsqueda Multimodal

**Tipo:** Imagen → Imágenes similares  
**Imagen de referencia:** [COMPLETAR con título]

**Resultados:**
[COMPLETAR]

**Screenshot:**
[INSERTAR CAPTURA]

**Análisis:**
[COMPLETAR: ¿Las imágenes similares tenían sentido visualmente?]

---

### 6.4 Caso de Prueba 4: RAG Complejo

**Query:** "¿Cuáles son las mejores opciones para un viaje romántico en pareja?"

**Resultados:**
[COMPLETAR]

**Respuesta del LLM:**
[INSERTAR RESPUESTA GENERADA]

**Screenshot:**
[INSERTAR CAPTURA]

**Análisis:**
[COMPLETAR: ¿La respuesta fue coherente y útil? ¿Usó bien el contexto?]

---

## 7. Comparación con Enfoque Relacional

### 7.1 Tabla Comparativa

| Aspecto                             | Base de Datos Relacional                     | MongoDB + RAG                      |
| ----------------------------------- | -------------------------------------------- | ---------------------------------- |
| **Almacenamiento de imágenes**      | BLOB en tablas o sistema de archivos externo | GridFS integrado                   |
| **Búsqueda de texto**               | LIKE '%keyword%' o Full-Text Search básico   | Vector Search semántico            |
| **Búsqueda multimodal**             | No soportado nativamente                     | Nativo con embeddings CLIP         |
| **Escalabilidad**                   | Vertical (hardware más potente)              | Horizontal (más nodos)             |
| **Esquema**                         | Rígido, requiere ALTER TABLE                 | Flexible, schema-less              |
| **Joins complejos**                 | Soportado nativamente                        | Requiere $lookup (menos eficiente) |
| **Índices vectoriales**             | No nativo (extensiones como pgvector)        | Nativo en Atlas                    |
| **Velocidad de búsqueda semántica** | Lenta con distancias en SQL                  | Optimizada con índices ANN         |

### 7.2 Análisis Detallado

#### ¿Por qué NoSQL para este caso?

**Ventajas:**

1. [COMPLETAR]
2. [COMPLETAR]
3. [COMPLETAR]

**Desventajas:**

1. [COMPLETAR]
2. [COMPLETAR]

#### Escenarios donde SQL sería mejor:

[COMPLETAR]

---

## 8. Lecciones Aprendidas

### 8.1 Técnicas

1. **[COMPLETAR: Lección 1]**

   - Desafío: [COMPLETAR]
   - Solución: [COMPLETAR]
   - Aprendizaje: [COMPLETAR]

2. **[COMPLETAR: Lección 2]**
   - [COMPLETAR]

### 8.2 Mejores Prácticas Descubiertas

- [COMPLETAR]
- [COMPLETAR]
- [COMPLETAR]

### 8.3 Errores Comunes Evitados

- [COMPLETAR]
- [COMPLETAR]

---

## 9. Conclusiones y Recomendaciones

### 9.1 Conclusiones

1. [COMPLETAR: Conclusión principal]
2. [COMPLETAR: Conclusión secundaria]
3. [COMPLETAR: Conclusión terciaria]

### 9.2 Recomendaciones para Producción

1. **Seguridad:**

   - Implementar autenticación JWT
   - Rate limiting
   - Validación de imágenes (tipo, tamaño, contenido)

2. **Rendimiento:**

   - Implementar caché con Redis
   - CDN para imágenes
   - Batch processing para múltiples uploads

3. **Escalabilidad:**

   - Cluster MongoDB Atlas M30+
   - Load balancer para API
   - Replicación geográfica

4. **Monitoreo:**
   - Logs estructurados
   - Métricas de uso (New Relic, Datadog)
   - Alertas de errores

### 9.3 Trabajo Futuro

- [ ] Interfaz gráfica web
- [ ] Soporte para videos
- [ ] Fine-tuning del modelo CLIP
- [ ] Sistema de feedback de usuarios
- [ ] A/B testing de modelos

---

## 10. Referencias

### Documentación Técnica

1. MongoDB Atlas Vector Search: https://www.mongodb.com/docs/atlas/atlas-vector-search/
2. CLIP Model (Hugging Face): https://huggingface.co/openai/clip-vit-base-patch32
3. Groq API Documentation: https://console.groq.com/docs

### Papers y Artículos

1. Lewis, P. et al. (2020). "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
2. Radford, A. et al. (2021). "Learning Transferable Visual Models From Natural Language Supervision"

### Recursos Adicionales

- [COMPLETAR con recursos que usaste]

---

## Anexos

### A. Comandos de Instalación

```bash
# Instalar dependencias Node.js
npm install

# Instalar dependencias Python
cd python
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales
```

### B. Comandos de Ejecución

```bash
# Terminal 1: CLIP Service
npm run clip-service

# Terminal 2: API Node.js
npm start

# Terminal 3: Cargar datos de ejemplo
npm run load-samples

# Terminal 4: Ejecutar casos de prueba
npm run test-cases
```

### C. Screenshots

#### C.1 MongoDB Atlas - Colección Media

[INSERTAR CAPTURA]

#### C.2 MongoDB Atlas - Índice Vectorial

[INSERTAR CAPTURA]

#### C.3 Postman - Ejemplo de Query

[INSERTAR CAPTURA]

#### C.4 Resultados de Casos de Prueba

[INSERTAR CAPTURAS DE LOS 4 CASOS]

---

**Fin del Informe**

---

## 📝 Instrucciones para Completar

1. ✅ Ejecutar `npm run load-samples`
2. ✅ Ejecutar `npm run test-cases` y copiar resultados
3. ✅ Tomar screenshots de cada caso de prueba
4. ✅ Tomar screenshots de MongoDB Atlas
5. ✅ Completar secciones marcadas con [COMPLETAR]
6. ✅ Añadir análisis personal y reflexiones
7. ✅ Revisar ortografía y formato
8. ✅ Exportar a PDF para entrega
