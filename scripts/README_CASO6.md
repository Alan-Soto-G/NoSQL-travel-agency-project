# 🖼️ Caso de Prueba 6: Búsqueda con Imagen Externa

Este caso de prueba te permite **subir una imagen desde tu PC** y buscar imágenes similares en la base de datos.

## 📋 Cómo usar

### Opción 1: Imagen por defecto (automático)

1. **Coloca una imagen** en la carpeta `scripts/` con el nombre `test-image.jpg`:

   ```
   scripts/test-image.jpg
   ```

2. **Ejecuta las pruebas normalmente**:

   ```bash
   npm run test-cases
   ```

   El Caso 6 se ejecutará automáticamente si detecta la imagen.

### Opción 2: Imagen personalizada (manual)

Ejecuta el caso 6 directamente con tu imagen:

```javascript
// En Node.js REPL o script personalizado
const { testCase6 } = require("./scripts/test-cases");

// Con ruta de Windows
await testCase6("C:\\Users\\User\\Pictures\\mi-playa.jpg");

// O ruta relativa
await testCase6("./mi-imagen-test.png");
```

## 🔄 Proceso del Caso 6

1. **📤 Upload**: Sube la imagen al servidor
2. **🧠 Embedding**: CLIP genera el vector de 512 dimensiones
3. **💾 Guardar**: Se guarda en MongoDB con metadatos
4. **🔍 Búsqueda**: Busca las 5 imágenes más similares usando vector search
5. **📊 Resultados**: Muestra similitud, categoría y descripción
6. **🗑️ Limpieza**: Elimina la imagen de prueba automáticamente

## 📸 Formatos soportados

- ✅ `.jpg` / `.jpeg`
- ✅ `.png`
- ✅ `.webp`
- ✅ `.gif`

## 📊 Métricas reportadas

El Caso 6 proporciona:

- ⏱️ **Tiempo de upload + embedding**
- ⏱️ **Tiempo de búsqueda**
- ⏱️ **Tiempo total**
- 📈 **Score de similitud** para cada resultado
- 📊 **Total de imágenes similares encontradas**

## 🎯 Ejemplo de uso

```bash
# 1. Coloca tu imagen
cp ~/Downloads/playa-caribe.jpg scripts/test-image.jpg

# 2. Ejecuta las pruebas
npm run test-cases

# Salida esperada:
# ================================================================================
# CASO DE PRUEBA 6: Búsqueda con Imagen Externa (Upload)
# ================================================================================
# 🖼️  Imagen a subir: C:\...\scripts\test-image.jpg
# 📝 Tipo: Upload → Embedding → Búsqueda de similares
#
# 📤 Paso 1/2: Subiendo imagen...
# ✅ Imagen subida exitosamente
# 📂 ID: 674d8a1b2f3e4a5b6c7d8e9f
# ⏱️  Tiempo de upload + embedding: 1234ms
#
# 🔍 Paso 2/2: Buscando imágenes similares...
# ⏱️  Tiempo de búsqueda: 567ms
# 📊 Imágenes similares encontradas: 5
#
# 🔍 Top 3 imágenes similares:
#   1. Playa de San Andrés
#      📈 Similitud: 0.9234
#      📂 Categoría: destino
#      💬 Hermosa playa caribeña con aguas cristalinas
```

## 💡 Tips

- **Imágenes claras**: Mejores resultados con imágenes bien iluminadas
- **Contenido relevante**: Usa imágenes de destinos/hoteles/actividades turísticas
- **Tamaño**: Máximo 10MB por imagen
- **Limpieza automática**: La imagen se elimina tras la prueba (no queda guardada)

## 🚨 Troubleshooting

**Error: "Imagen no encontrada"**

- Verifica que la imagen existe en `scripts/test-image.jpg`
- Revisa el nombre del archivo (debe ser exactamente `test-image.jpg`)

**Error: "Failed to upload"**

- Asegúrate que el servidor Node.js esté corriendo (`npm start`)
- Verifica que el servicio Python CLIP esté activo

**No encuentra similares**

- Asegúrate de haber cargado imágenes de muestra (`npm run load-samples`)
- Verifica que el índice vectorial esté creado en MongoDB Atlas
