from flask import Flask, request, jsonify
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch
import base64
import io
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Cargar modelo CLIP
logger.info("🔄 Cargando modelo CLIP...")
model_name = "openai/clip-vit-base-patch32"
model = CLIPModel.from_pretrained(model_name)
processor = CLIPProcessor.from_pretrained(model_name)
logger.info("✅ Modelo CLIP cargado exitosamente")

# Usar CPU o GPU según disponibilidad
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)
logger.info(f"📱 Usando dispositivo: {device}")


def generate_embedding(inputs, input_type="text"):
    """
    Genera embeddings usando CLIP
    
    Args:
        inputs: Texto o imagen procesada
        input_type: "text" o "image"
    
    Returns:
        Lista de floats (embedding de 512 dimensiones)
    """
    try:
        with torch.no_grad():
            if input_type == "text":
                outputs = model.get_text_features(**inputs)
            elif input_type == "image":
                outputs = model.get_image_features(**inputs)
            else:
                raise ValueError(f"Tipo de entrada inválido: {input_type}")
            
            # Normalizar embedding (importante para cosine similarity)
            embeddings = outputs / outputs.norm(dim=-1, keepdim=True)
            
            # Convertir a lista de Python
            embedding_list = embeddings.cpu().numpy()[0].tolist()
            
            return embedding_list
    
    except Exception as e:
        logger.error(f"Error generando embedding: {str(e)}")
        raise


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "model": model_name,
        "device": device,
        "embedding_dim": 512
    })


@app.route('/embed/text', methods=['POST'])
def embed_text():
    """
    Generar embedding para texto
    
    Request JSON:
    {
        "text": "playa paradisíaca con arena blanca"
    }
    
    Response:
    {
        "embedding": [0.123, -0.456, ...],  // 512 floats
        "dimension": 512
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({
                "error": "El campo 'text' es requerido"
            }), 400
        
        text = data['text']
        
        if not text or not text.strip():
            return jsonify({
                "error": "El texto no puede estar vacío"
            }), 400
        
        # Procesar texto
        inputs = processor(
            text=[text],
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=77
        ).to(device)
        
        # Generar embedding
        embedding = generate_embedding(inputs, input_type="text")
        
        logger.info(f"✅ Embedding de texto generado: '{text[:50]}...'")
        
        return jsonify({
            "embedding": embedding,
            "dimension": len(embedding),
            "text": text
        })
    
    except Exception as e:
        logger.error(f"Error en /embed/text: {str(e)}")
        return jsonify({
            "error": str(e)
        }), 500


@app.route('/embed/image', methods=['POST'])
def embed_image():
    """
    Generar embedding para imagen
    
    Acepta dos formatos:
    1. Multipart/form-data con campo 'image' (archivo)
    2. JSON con campo 'image_base64' (imagen en base64)
    
    Response:
    {
        "embedding": [0.123, -0.456, ...],  // 512 floats
        "dimension": 512
    }
    """
    try:
        image = None
        
        # Formato 1: Multipart form-data
        if 'image' in request.files:
            file = request.files['image']
            if file.filename == '':
                return jsonify({
                    "error": "No se seleccionó ningún archivo"
                }), 400
            
            try:
                image = Image.open(file.stream).convert('RGB')
            except Exception as e:
                return jsonify({
                    "error": f"Error al procesar imagen: {str(e)}"
                }), 400
        
        # Formato 2: Base64 en JSON
        elif request.is_json:
            data = request.get_json()
            if 'image_base64' not in data:
                return jsonify({
                    "error": "Se requiere 'image' (file) o 'image_base64' (string)"
                }), 400
            
            try:
                image_data = base64.b64decode(data['image_base64'])
                image = Image.open(io.BytesIO(image_data)).convert('RGB')
            except Exception as e:
                return jsonify({
                    "error": f"Error decodificando base64: {str(e)}"
                }), 400
        
        else:
            return jsonify({
                "error": "Formato de solicitud inválido. Use multipart/form-data o JSON con base64"
            }), 400
        
        # Procesar imagen
        inputs = processor(
            images=image,
            return_tensors="pt"
        ).to(device)
        
        # Generar embedding
        embedding = generate_embedding(inputs, input_type="image")
        
        logger.info(f"✅ Embedding de imagen generado (tamaño: {image.size})")
        
        return jsonify({
            "embedding": embedding,
            "dimension": len(embedding),
            "image_size": image.size
        })
    
    except Exception as e:
        logger.error(f"Error en /embed/image: {str(e)}")
        return jsonify({
            "error": str(e)
        }), 500


@app.route('/embed/batch', methods=['POST'])
def embed_batch():
    """
    Generar embeddings para múltiples textos
    
    Request JSON:
    {
        "texts": ["texto 1", "texto 2", ...]
    }
    
    Response:
    {
        "embeddings": [[...], [...], ...],
        "dimension": 512,
        "count": 2
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'texts' not in data:
            return jsonify({
                "error": "El campo 'texts' es requerido"
            }), 400
        
        texts = data['texts']
        
        if not isinstance(texts, list) or len(texts) == 0:
            return jsonify({
                "error": "'texts' debe ser una lista no vacía"
            }), 400
        
        # Procesar textos en batch
        inputs = processor(
            text=texts,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=77
        ).to(device)
        
        # Generar embeddings
        with torch.no_grad():
            outputs = model.get_text_features(**inputs)
            embeddings = outputs / outputs.norm(dim=-1, keepdim=True)
            embeddings_list = embeddings.cpu().numpy().tolist()
        
        logger.info(f"✅ {len(texts)} embeddings de texto generados")
        
        return jsonify({
            "embeddings": embeddings_list,
            "dimension": len(embeddings_list[0]),
            "count": len(embeddings_list)
        })
    
    except Exception as e:
        logger.error(f"Error en /embed/batch: {str(e)}")
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=False  # Cambiar a True solo para desarrollo
    )
