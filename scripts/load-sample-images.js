require("dotenv").config();
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

/**
 * Script para cargar imágenes de ejemplo al sistema RAG
 * Genera URLs de imágenes de prueba usando servicios públicos
 */

const API_BASE_URL =
  process.env.API_BASE_URL || "http://localhost:3000/api/rag";

// Datos de ejemplo para la agencia de viajes
const sampleImages = [
  // DESTINOS - PLAYAS
  {
    url: "https://picsum.photos/800/600?random=1",
    filename: "playa_caribe_1.jpg",
    metadata: {
      title: "Playa del Carmen - Caribe Mexicano",
      category: "destinos",
      tags: ["playa", "caribe", "mexico", "arena-blanca"],
      caption:
        "Hermosa playa de arena blanca con aguas cristalinas turquesas del Caribe mexicano",
      related_entity_id: "destino_playa_carmen_001",
    },
  },
  {
    url: "https://picsum.photos/800/600?random=2",
    filename: "playa_colombia_1.jpg",
    metadata: {
      title: "Playa de Cartagena - Colombia",
      category: "destinos",
      tags: ["playa", "colombia", "cartagena", "caribe"],
      caption: "Playa paradisíaca en Cartagena con palmeras y mar azul intenso",
      related_entity_id: "destino_cartagena_001",
    },
  },
  {
    url: "https://picsum.photos/800/600?random=3",
    filename: "isla_tropical_1.jpg",
    metadata: {
      title: "Isla Tropical - Pacífico",
      category: "destinos",
      tags: ["isla", "tropical", "pacifico", "exotico"],
      caption:
        "Isla tropical rodeada de aguas cristalinas perfecta para luna de miel",
      related_entity_id: "destino_isla_pacifico_001",
    },
  },

  // HOTELES - LUJO
  {
    url: "https://picsum.photos/800/600?random=4",
    filename: "hotel_lujo_1.jpg",
    metadata: {
      title: "Suite Presidential - Hotel Gran Caribe",
      category: "hoteles",
      tags: ["hotel", "lujo", "suite", "cinco-estrellas"],
      caption: "Suite presidencial con vista al mar y acabados de lujo",
      related_entity_id: "hotel_gran_caribe_001",
    },
  },
  {
    url: "https://picsum.photos/800/600?random=5",
    filename: "hotel_boutique_1.jpg",
    metadata: {
      title: "Hotel Boutique Colonial",
      category: "hoteles",
      tags: ["hotel", "boutique", "colonial", "romantico"],
      caption:
        "Hotel boutique con arquitectura colonial en el centro histórico",
      related_entity_id: "hotel_colonial_001",
    },
  },
  {
    url: "https://picsum.photos/800/600?random=6",
    filename: "hotel_resort_1.jpg",
    metadata: {
      title: "Resort Todo Incluido",
      category: "hoteles",
      tags: ["resort", "todo-incluido", "familiar", "piscina"],
      caption: "Resort de lujo con piscinas infinitas y playa privada",
      related_entity_id: "hotel_resort_001",
    },
  },

  // ACTIVIDADES - AVENTURA
  {
    url: "https://picsum.photos/800/600?random=7",
    filename: "actividad_buceo_1.jpg",
    metadata: {
      title: "Buceo en Arrecife de Coral",
      category: "actividades",
      tags: ["buceo", "aventura", "acuatico", "arrecife"],
      caption:
        "Experiencia de buceo en arrecife de coral con vida marina abundante",
      related_entity_id: "actividad_buceo_001",
    },
  },
  {
    url: "https://picsum.photos/800/600?random=8",
    filename: "actividad_parapente_1.jpg",
    metadata: {
      title: "Parapente sobre la Costa",
      category: "actividades",
      tags: ["parapente", "aventura", "extremo", "costa"],
      caption: "Vuelo en parapente con vistas espectaculares de la costa",
      related_entity_id: "actividad_parapente_001",
    },
  },
  {
    url: "https://picsum.photos/800/600?random=9",
    filename: "actividad_surf_1.jpg",
    metadata: {
      title: "Clases de Surf",
      category: "actividades",
      tags: ["surf", "deporte", "playa", "clases"],
      caption: "Clases de surf para principiantes en playa con olas perfectas",
      related_entity_id: "actividad_surf_001",
    },
  },

  // GASTRONOMÍA
  {
    url: "https://picsum.photos/800/600?random=10",
    filename: "restaurante_playa_1.jpg",
    metadata: {
      title: "Restaurante Gourmet en la Playa",
      category: "gastronomia",
      tags: ["restaurante", "gourmet", "playa", "mariscos"],
      caption:
        "Restaurante gourmet especializado en mariscos frescos frente al mar",
      related_entity_id: "restaurante_playa_001",
    },
  },
  {
    url: "https://picsum.photos/800/600?random=11",
    filename: "cocina_local_1.jpg",
    metadata: {
      title: "Cocina Típica Regional",
      category: "gastronomia",
      tags: ["comida-tipica", "regional", "tradicional", "cultural"],
      caption: "Platillos tradicionales de la región con ingredientes locales",
      related_entity_id: "restaurante_regional_001",
    },
  },

  // EVENTOS
  {
    url: "https://picsum.photos/800/600?random=12",
    filename: "evento_boda_playa_1.jpg",
    metadata: {
      title: "Boda en la Playa al Atardecer",
      category: "eventos",
      tags: ["boda", "playa", "romantico", "atardecer"],
      caption: "Ceremonia de boda romántica en la playa durante el atardecer",
      related_entity_id: "evento_boda_001",
    },
  },
  {
    url: "https://picsum.photos/800/600?random=13",
    filename: "evento_corporativo_1.jpg",
    metadata: {
      title: "Evento Corporativo en Salón",
      category: "eventos",
      tags: ["corporativo", "conferencia", "salon", "negocios"],
      caption:
        "Salón de eventos equipado para conferencias y eventos corporativos",
      related_entity_id: "evento_corporativo_001",
    },
  },

  // TRANSPORTE
  {
    url: "https://picsum.photos/800/600?random=14",
    filename: "transporte_yate_1.jpg",
    metadata: {
      title: "Yate de Lujo",
      category: "transporte",
      tags: ["yate", "lujo", "nautico", "privado"],
      caption: "Yate de lujo para tours privados y eventos especiales",
      related_entity_id: "vehiculo_yate_001",
    },
  },
  {
    url: "https://picsum.photos/800/600?random=15",
    filename: "transporte_van_1.jpg",
    metadata: {
      title: "Van Ejecutiva",
      category: "transporte",
      tags: ["van", "ejecutiva", "terrestre", "grupo"],
      caption: "Van ejecutiva con aire acondicionado para grupos pequeños",
      related_entity_id: "vehiculo_van_001",
    },
  },
];

/**
 * Descargar imagen desde URL
 */
async function downloadImage(url, filepath) {
  const response = await axios({
    method: "GET",
    url: url,
    responseType: "stream",
  });

  const writer = fs.createWriteStream(filepath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

/**
 * Subir imagen al sistema RAG
 */
async function uploadImage(imagePath, metadata) {
  try {
    const form = new FormData();
    form.append("image", fs.createReadStream(imagePath));
    form.append("title", metadata.title);
    form.append("category", metadata.category);
    form.append("tags", metadata.tags.join(","));
    form.append("caption", metadata.caption);
    form.append("related_entity_id", metadata.related_entity_id);

    const response = await axios.post(`${API_BASE_URL}/upload`, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      `Error subiendo imagen: ${error.response?.data?.error || error.message}`
    );
  }
}

/**
 * Script principal
 */
async function main() {
  console.log("🚀 Iniciando carga de imágenes de ejemplo...\n");

  const tempDir = path.join(__dirname, "..", "test-data", "temp");

  // Crear directorio temporal
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < sampleImages.length; i++) {
    const sample = sampleImages[i];
    const tempPath = path.join(tempDir, sample.filename);

    try {
      console.log(
        `[${i + 1}/${sampleImages.length}] Procesando: ${sample.metadata.title}`
      );

      // Descargar imagen
      console.log(`  📥 Descargando imagen...`);
      await downloadImage(sample.url, tempPath);

      // Esperar un poco para no saturar el servicio
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Subir al sistema RAG
      console.log(`  📤 Subiendo al sistema RAG...`);
      const result = await uploadImage(tempPath, sample.metadata);

      console.log(`  ✅ Éxito - ID: ${result.mediaId}`);
      console.log(
        `  📊 Embedding generado: ${
          result.embedding?.length || 0
        } dimensiones\n`
      );

      successCount++;

      // Limpiar archivo temporal
      fs.unlinkSync(tempPath);
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`);
      errorCount++;

      // Limpiar archivo temporal si existe
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  }

  // Resumen
  console.log("\n" + "=".repeat(60));
  console.log("📊 RESUMEN DE CARGA");
  console.log("=".repeat(60));
  console.log(`✅ Exitosas: ${successCount}`);
  console.log(`❌ Fallidas: ${errorCount}`);
  console.log(`📈 Total: ${sampleImages.length}`);
  console.log(
    `🎯 Tasa de éxito: ${((successCount / sampleImages.length) * 100).toFixed(
      1
    )}%`
  );
  console.log("=".repeat(60) + "\n");

  // Limpiar directorio temporal
  if (fs.existsSync(tempDir)) {
    fs.rmdirSync(tempDir);
  }

  console.log("✨ Proceso completado\n");
  process.exit(errorCount > 0 ? 1 : 0);
}

// Ejecutar
if (require.main === module) {
  main().catch((error) => {
    console.error("💥 Error fatal:", error);
    process.exit(1);
  });
}

module.exports = { sampleImages, uploadImage };
