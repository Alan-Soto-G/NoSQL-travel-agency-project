# Validators de MongoDB Atlas

Validadores de esquema JSON para todas las colecciones del sistema de agencia de viajes.

---

## 🚗 CARRO

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["vehiculo_id"],
    "properties": {
      "_id": {
        "bsonType": "objectId",
        "description": "ID único del documento"
      },
      "vehiculo_id": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50,
        "description": "ID del vehículo - requerido"
      },
      "tipo_combustible": {
        "bsonType": "string",
        "enum": ["gasolina", "diésel", "eléctrico", "híbrido", "gas natural"],
        "description": "Tipo de combustible del vehículo - opcional"
      },
      "transmision": {
        "bsonType": "string",
        "enum": ["manual", "automática", "semi-automática", "CVT"],
        "description": "Tipo de transmisión - opcional"
      },
      "color": {
        "bsonType": "string",
        "minLength": 2,
        "maxLength": 30,
        "description": "Color del vehículo - opcional"
      },
      "kilometraje": {
        "bsonType": "number",
        "minimum": 0,
        "maximum": 1000000,
        "description": "Kilometraje del vehículo - opcional"
      },
      "description_embedding": {
        "bsonType": "array",
        "items": {
          "bsonType": "double"
        },
        "minItems": 512,
        "maxItems": 512,
        "description": "Vector embedding de 512 dimensiones para búsqueda vectorial - opcional"
      }
    },
    "additionalProperties": true
  }
}
```

### Comando para aplicar validator

```javascript
db.runCommand({
  collMod: "carros",
  validator: {
    "$jsonSchema": {
      "bsonType": "object",
      "required": ["vehiculo_id"],
      "properties": {
        "_id": {
          "bsonType": "objectId"
        },
        "vehiculo_id": {
          "bsonType": "string",
          "minLength": 1,
          "maxLength": 50
        },
        "tipo_combustible": {
          "bsonType": "string",
          "enum": ["gasolina", "diésel", "eléctrico", "híbrido", "gas natural"]
        },
        "transmision": {
          "bsonType": "string",
          "enum": ["manual", "automática", "semi-automática", "CVT"]
        },
        "color": {
          "bsonType": "string",
          "minLength": 2,
          "maxLength": 30
        },
        "kilometraje": {
          "bsonType": "number",
          "minimum": 0,
          "maximum": 1000000
        },
        "description_embedding": {
          "bsonType": "array",
          "items": {
            "bsonType": "double"
          },
          "minItems": 512,
          "maxItems": 512
        }
      },
      "additionalProperties": true
    }
  },
  validationLevel: "moderate",
  validationAction: "error"
})
```

---

## 🏙️ MUNICIPIO

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["nombre", "departamento", "pais"],
    "properties": {
      "_id": {
        "bsonType": "objectId",
        "description": "ID único del documento"
      },
      "nombre": {
        "bsonType": "string",
        "minLength": 2,
        "maxLength": 100,
        "description": "Nombre del municipio - requerido"
      },
      "departamento": {
        "bsonType": "string",
        "minLength": 2,
        "maxLength": 100,
        "description": "Departamento o estado - requerido"
      },
      "pais": {
        "bsonType": "string",
        "minLength": 2,
        "maxLength": 100,
        "description": "País del municipio - requerido"
      },
      "descripcion_turistica": {
        "bsonType": "string",
        "minLength": 10,
        "maxLength": 2000,
        "description": "Descripción turística del municipio - opcional"
      },
      "descripcion_embedding": {
        "bsonType": "array",
        "items": {
          "bsonType": "double"
        },
        "minItems": 512,
        "maxItems": 512,
        "description": "Vector embedding de 512 dimensiones para búsqueda vectorial - opcional"
      }
    },
    "additionalProperties": true
  }
}
```

### Comando para aplicar validator

```javascript
db.runCommand({
  collMod: "municipios",
  validator: {
    "$jsonSchema": {
      "bsonType": "object",
      "required": ["nombre", "departamento", "pais"],
      "properties": {
        "_id": {
          "bsonType": "objectId"
        },
        "nombre": {
          "bsonType": "string",
          "minLength": 2,
          "maxLength": 100
        },
        "departamento": {
          "bsonType": "string",
          "minLength": 2,
          "maxLength": 100
        },
        "pais": {
          "bsonType": "string",
          "minLength": 2,
          "maxLength": 100
        },
        "descripcion_turistica": {
          "bsonType": "string",
          "minLength": 10,
          "maxLength": 2000
        },
        "descripcion_embedding": {
          "bsonType": "array",
          "items": {
            "bsonType": "double"
          },
          "minItems": 512,
          "maxItems": 512
        }
      },
      "additionalProperties": true
    }
  },
  validationLevel: "moderate",
  validationAction: "error"
})
```

---

## 🏨 HOTEL

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["id_administrador", "nombre", "direccion", "categoria", "municipio_id"],
    "properties": {
      "_id": {
        "bsonType": "objectId",
        "description": "ID único del documento"
      },
      "id_administrador": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50,
        "description": "ID del administrador del hotel - requerido"
      },
      "nombre": {
        "bsonType": "string",
        "minLength": 3,
        "maxLength": 150,
        "description": "Nombre del hotel - requerido"
      },
      "direccion": {
        "bsonType": "string",
        "minLength": 5,
        "maxLength": 250,
        "description": "Dirección del hotel - requerido"
      },
      "categoria": {
        "bsonType": "string",
        "enum": ["1 estrella", "2 estrellas", "3 estrellas", "4 estrellas", "5 estrellas", "boutique", "resort", "hostal"],
        "description": "Categoría del hotel - requerido"
      },
      "municipio_id": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50,
        "description": "ID del municipio donde está ubicado - requerido"
      },
      "amenities_embedding": {
        "bsonType": "array",
        "items": {
          "bsonType": "double"
        },
        "minItems": 512,
        "maxItems": 512,
        "description": "Vector embedding de 512 dimensiones para búsqueda vectorial - opcional"
      }
    },
    "additionalProperties": true
  }
}
```

### Comando para aplicar validator

```javascript
db.runCommand({
  collMod: "hoteles",
  validator: {
    "$jsonSchema": {
      "bsonType": "object",
      "required": ["id_administrador", "nombre", "direccion", "categoria", "municipio_id"],
      "properties": {
        "_id": {
          "bsonType": "objectId"
        },
        "id_administrador": {
          "bsonType": "string",
          "minLength": 1,
          "maxLength": 50
        },
        "nombre": {
          "bsonType": "string",
          "minLength": 3,
          "maxLength": 150
        },
        "direccion": {
          "bsonType": "string",
          "minLength": 5,
          "maxLength": 250
        },
        "categoria": {
          "bsonType": "string",
          "enum": ["1 estrella", "2 estrellas", "3 estrellas", "4 estrellas", "5 estrellas", "boutique", "resort", "hostal"]
        },
        "municipio_id": {
          "bsonType": "string",
          "minLength": 1,
          "maxLength": 50
        },
        "amenities_embedding": {
          "bsonType": "array",
          "items": {
            "bsonType": "double"
          },
          "minItems": 512,
          "maxItems": 512
        }
      },
      "additionalProperties": true
    }
  },
  validationLevel: "moderate",
  validationAction: "error"
})
```

---

## 🎯 ACTIVIDAD_TURISTICA

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["id_municipio", "nombre", "duracion_horas", "costo"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "id_municipio": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "nombre": {
        "bsonType": "string",
        "minLength": 3,
        "maxLength": 150
      },
      "descripcion": {
        "bsonType": "string",
        "minLength": 10,
        "maxLength": 1000
      },
      "duracion_horas": {
        "bsonType": "number",
        "minimum": 0.5,
        "maximum": 240
      },
      "costo": {
        "bsonType": "number",
        "minimum": 0,
        "maximum": 10000000
      }
    },
    "additionalProperties": true
  }
}
```

---

## 👤 ADMINISTRADOR

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["usuario_id", "cargo", "fecha_inicio"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "usuario_id": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "cargo": {
        "bsonType": "string",
        "enum": ["gerente", "supervisor", "coordinador", "asistente", "director", "administrador general"],
        "description": "Cargo del administrador"
      },
      "fecha_inicio": {
        "bsonType": "date"
      }
    },
    "additionalProperties": true
  }
}
```

---

## ✈️ AEROLINEA

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["nombre", "codigo_iata", "pais_origen"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "nombre": {
        "bsonType": "string",
        "minLength": 2,
        "maxLength": 100
      },
      "codigo_iata": {
        "bsonType": "string",
        "minLength": 2,
        "maxLength": 3,
        "pattern": "^[A-Z0-9]{2,3}$",
        "description": "Código IATA de 2-3 caracteres mayúsculas"
      },
      "pais_origen": {
        "bsonType": "string",
        "minLength": 2,
        "maxLength": 100
      }
    },
    "additionalProperties": true
  }
}
```

---

## 🛩️ AERONAVE

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["vehiculo_id", "codigo_aeronave", "capacidad_pasajeros"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "vehiculo_id": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "codigo_aeronave": {
        "bsonType": "string",
        "minLength": 3,
        "maxLength": 20,
        "description": "Código único de la aeronave"
      },
      "capacidad_pasajeros": {
        "bsonType": "number",
        "minimum": 1,
        "maximum": 850,
        "description": "Capacidad entre 1 y 850 pasajeros"
      },
      "id_aerolinea": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      }
    },
    "additionalProperties": true
  }
}
```

---

## 👥 CLIENTE

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["usuario_id"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "usuario_id": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "es_vip": {
        "bsonType": "bool",
        "description": "Indica si el cliente es VIP"
      },
      "puntos_fidelidad": {
        "bsonType": "number",
        "minimum": 0,
        "maximum": 1000000,
        "description": "Puntos acumulados del cliente"
      },
      "nivel_membresia": {
        "bsonType": "string",
        "enum": ["basico", "plata", "oro", "platino", "diamante"],
        "description": "Nivel de membresía del cliente"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 🧳 CLIENTE_VIAJE

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["id_cliente", "id_viaje", "estado", "fecha_participacion"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "id_cliente": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "id_viaje": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "estado": {
        "bsonType": "string",
        "enum": ["confirmado", "pendiente", "cancelado", "completado", "en_proceso"],
        "description": "Estado de la participación del cliente"
      },
      "fecha_participacion": {
        "bsonType": "date"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 💰 CUOTA

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["id_viaje", "numero_cuota", "fecha_pago", "monto", "estado"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "id_viaje": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "numero_cuota": {
        "bsonType": "number",
        "minimum": 1,
        "maximum": 100,
        "description": "Número de cuota entre 1 y 100"
      },
      "fecha_pago": {
        "bsonType": "date"
      },
      "monto": {
        "bsonType": "number",
        "minimum": 0,
        "maximum": 100000000
      },
      "estado": {
        "bsonType": "string",
        "enum": ["pendiente", "pagada", "vencida", "cancelada"],
        "description": "Estado del pago de la cuota"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 🧾 FACTURA

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["id_cuota", "numero_factura", "fecha_emision", "total", "estado"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "id_cuota": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "numero_factura": {
        "bsonType": "string",
        "minLength": 5,
        "maxLength": 50,
        "description": "Número único de factura"
      },
      "fecha_emision": {
        "bsonType": "date"
      },
      "total": {
        "bsonType": "number",
        "minimum": 0,
        "maximum": 100000000
      },
      "estado": {
        "bsonType": "string",
        "enum": ["emitida", "pagada", "anulada", "pendiente"],
        "description": "Estado de la factura"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 📍 GPS

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["latitud", "longitud", "ultima_actualizacion", "estado"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "latitud": {
        "bsonType": "number",
        "minimum": -90,
        "maximum": 90,
        "description": "Latitud entre -90 y 90 grados"
      },
      "longitud": {
        "bsonType": "number",
        "minimum": -180,
        "maximum": 180,
        "description": "Longitud entre -180 y 180 grados"
      },
      "ultima_actualizacion": {
        "bsonType": "date"
      },
      "estado": {
        "bsonType": "string",
        "enum": ["activo", "inactivo", "en_mantenimiento", "fuera_de_servicio"],
        "description": "Estado del dispositivo GPS"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 🗺️ GUIA

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["usuario_id", "idioma", "especialidad"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "usuario_id": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "idioma": {
        "bsonType": "string",
        "minLength": 2,
        "maxLength": 50,
        "description": "Idioma(s) que maneja el guía"
      },
      "especialidad": {
        "bsonType": "string",
        "minLength": 3,
        "maxLength": 100,
        "description": "Especialidad turística del guía"
      },
      "calificacion_promedio": {
        "bsonType": "number",
        "minimum": 0,
        "maximum": 5,
        "description": "Calificación de 0 a 5 estrellas"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 📋 GUIA_ACTIVIDAD

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["id_guia", "id_actividad", "fecha_asignacion", "horario"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "id_guia": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "id_actividad": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "fecha_asignacion": {
        "bsonType": "date"
      },
      "horario": {
        "bsonType": "string",
        "minLength": 3,
        "maxLength": 100,
        "description": "Horario de la actividad (ej: '09:00 - 12:00')"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 🛏️ HABITACION

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["id_hotel", "numero", "tipo", "precio_noche", "capacidad"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "id_hotel": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "numero": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 20,
        "description": "Número de habitación"
      },
      "tipo": {
        "bsonType": "string",
        "enum": ["sencilla", "doble", "suite", "suite presidencial", "triple", "familiar"],
        "description": "Tipo de habitación"
      },
      "precio_noche": {
        "bsonType": "number",
        "minimum": 0,
        "maximum": 50000000,
        "description": "Precio por noche"
      },
      "capacidad": {
        "bsonType": "number",
        "minimum": 1,
        "maximum": 20,
        "description": "Capacidad de personas"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 🚌 ITINERARIO_TRANSPORTE

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["fecha_salida", "fecha_llegada", "id_viaje", "id_servicio_transporte"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "fecha_salida": {
        "bsonType": "date"
      },
      "fecha_llegada": {
        "bsonType": "date"
      },
      "id_trayecto": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "id_viaje": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "id_servicio_transporte": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      }
    },
    "additionalProperties": true
  }
}
```

---

## 📸 MEDIA

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["title", "category", "image_file_id", "image_embedding"],
    "properties": {
      "_id": {
        "bsonType": "string"
      },
      "title": {
        "bsonType": "string",
        "minLength": 3,
        "maxLength": 200,
        "description": "Título descriptivo de la imagen"
      },
      "category": {
        "bsonType": "string",
        "enum": ["hotel", "actividad", "destino", "vehiculo", "transporte", "general"],
        "description": "Categoría de la imagen"
      },
      "tags": {
        "bsonType": "array",
        "items": {
          "bsonType": "string"
        },
        "description": "Etiquetas para filtrado"
      },
      "caption": {
        "bsonType": "string",
        "maxLength": 500
      },
      "image_file_id": {
        "bsonType": "string",
        "minLength": 1,
        "description": "ObjectId del archivo en GridFS"
      },
      "image_embedding": {
        "bsonType": "array",
        "items": {
          "bsonType": "double"
        },
        "minItems": 512,
        "maxItems": 512,
        "description": "Vector CLIP de 512 dimensiones"
      },
      "related_entity_id": {
        "bsonType": "string",
        "maxLength": 50
      },
      "metadata": {
        "bsonType": "object",
        "properties": {
          "width": { "bsonType": "number" },
          "height": { "bsonType": "number" },
          "format": { "bsonType": "string" },
          "size": { "bsonType": "number" }
        }
      },
      "created_at": {
        "bsonType": "date"
      },
      "updated_at": {
        "bsonType": "date"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 📦 PLAN

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["nombre", "tipo", "precio_total"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "nombre": {
        "bsonType": "string",
        "minLength": 3,
        "maxLength": 150
      },
      "tipo": {
        "bsonType": "string",
        "enum": ["basico", "intermedio", "premium", "vip", "personalizado"],
        "description": "Tipo de plan turístico"
      },
      "descripcion": {
        "bsonType": "string",
        "minLength": 10,
        "maxLength": 2000
      },
      "precio_total": {
        "bsonType": "number",
        "minimum": 0,
        "maximum": 100000000
      }
    },
    "additionalProperties": true
  }
}
```

---

## 🎭 PLAN_ACTIVIDAD

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["id_plan", "id_actividad"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "id_plan": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "id_actividad": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      }
    },
    "additionalProperties": true
  }
}
```

---

## 📅 RESERVA

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["id_viaje", "id_habitacion", "fecha_check_in", "fecha_check_out"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "id_viaje": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "id_habitacion": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "fecha_check_in": {
        "bsonType": "date"
      },
      "fecha_check_out": {
        "bsonType": "date"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 🚐 SERVICIO_TRANSPORTE

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["fecha_inicio", "fecha_fin", "costo", "estado", "id_vehículo", "id_trayecto"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "fecha_inicio": {
        "bsonType": "date"
      },
      "fecha_fin": {
        "bsonType": "date"
      },
      "costo": {
        "bsonType": "number",
        "minimum": 0,
        "maximum": 50000000
      },
      "estado": {
        "bsonType": "string",
        "enum": ["programado", "en_curso", "completado", "cancelado", "retrasado"],
        "description": "Estado del servicio de transporte"
      },
      "id_vehículo": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "id_trayecto": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      }
    },
    "additionalProperties": true
  }
}
```

---

## 💳 TARJETA_BANCARIA

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["id_cliente", "tipo", "numero_enmascarado", "nombre_titular", "fecha_vencimiento"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "id_cliente": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "tipo": {
        "bsonType": "string",
        "enum": ["debito", "credito", "prepago"],
        "description": "Tipo de tarjeta"
      },
      "numero_enmascarado": {
        "bsonType": "string",
        "minLength": 8,
        "maxLength": 19,
        "pattern": "^[*0-9]+$",
        "description": "Número de tarjeta enmascarado (ej: ****1234)"
      },
      "nombre_titular": {
        "bsonType": "string",
        "minLength": 3,
        "maxLength": 150
      },
      "fecha_vencimiento": {
        "bsonType": "date"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 🛣️ TRAYECTO

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["origen", "destino", "distancia_km"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "origen": {
        "bsonType": "string",
        "minLength": 2,
        "maxLength": 150,
        "description": "Punto de origen del trayecto"
      },
      "destino": {
        "bsonType": "string",
        "minLength": 2,
        "maxLength": 150,
        "description": "Punto de destino del trayecto"
      },
      "distancia_km": {
        "bsonType": "number",
        "minimum": 0,
        "maximum": 50000,
        "description": "Distancia en kilómetros"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 👨‍💼 USUARIO

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["nombre", "apellido", "email", "roles"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "nombre": {
        "bsonType": "string",
        "minLength": 2,
        "maxLength": 100
      },
      "apellido": {
        "bsonType": "string",
        "minLength": 2,
        "maxLength": 100
      },
      "email": {
        "bsonType": "string",
        "minLength": 5,
        "maxLength": 150,
        "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        "description": "Email válido"
      },
      "roles": {
        "bsonType": "array",
        "items": {
          "bsonType": "string",
          "enum": ["cliente", "administrador", "guia", "operador"]
        },
        "minItems": 1,
        "uniqueItems": true,
        "description": "Al menos un rol requerido"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 🚙 VEHICULO

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["tipo", "placa", "modelo", "capacidad"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "tipo": {
        "bsonType": "string",
        "enum": ["bus", "van", "automovil", "aeronave", "barco", "otro"],
        "description": "Tipo de vehículo"
      },
      "placa": {
        "bsonType": "string",
        "minLength": 5,
        "maxLength": 15,
        "description": "Placa del vehículo"
      },
      "modelo": {
        "bsonType": "string",
        "minLength": 2,
        "maxLength": 100
      },
      "capacidad": {
        "bsonType": "number",
        "minimum": 1,
        "maximum": 1000,
        "description": "Capacidad de pasajeros"
      }
    },
    "additionalProperties": true
  }
}
```

---

## ✈️ VIAJE

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["nombre", "fecha_inicio", "fecha_fin", "estado"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "nombre": {
        "bsonType": "string",
        "minLength": 3,
        "maxLength": 200
      },
      "fecha_inicio": {
        "bsonType": "date"
      },
      "fecha_fin": {
        "bsonType": "date"
      },
      "estado": {
        "bsonType": "string",
        "enum": ["planificado", "confirmado", "en_curso", "completado", "cancelado"],
        "description": "Estado del viaje"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 🗓️ VIAJE_PLAN

### Validator JSON Schema

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["id_viaje", "id_plan", "fecha_asignacion", "cantidad_personas"],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "id_viaje": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "id_plan": {
        "bsonType": "string",
        "minLength": 1,
        "maxLength": 50
      },
      "fecha_asignacion": {
        "bsonType": "date"
      },
      "cantidad_personas": {
        "bsonType": "number",
        "minimum": 1,
        "maxLength": 1000,
        "description": "Cantidad de personas en el plan"
      }
    },
    "additionalProperties": true
  }
}
```

---

## 📋 Resumen de Validaciones

### CARRO
- **Campos requeridos**: `vehiculo_id`
- **Enums**: `tipo_combustible` (5 opciones), `transmision` (4 opciones)
- **Rangos numéricos**: `kilometraje` (0 - 1,000,000)
- **Longitudes**: `vehiculo_id` (1-50), `color` (2-30)

### MUNICIPIO
- **Campos requeridos**: `nombre`, `departamento`, `pais`
- **Longitudes**: `nombre` (2-100), `departamento` (2-100), `pais` (2-100), `descripcion_turistica` (10-2000)
- **Sin enums**: Permite flexibilidad en los valores

### HOTEL
- **Campos requeridos**: `id_administrador`, `nombre`, `direccion`, `categoria`, `municipio_id`
- **Enums**: `categoria` (8 opciones: estrellas, boutique, resort, hostal)
- **Longitudes**: `nombre` (3-150), `direccion` (5-250), `id_administrador` (1-50), `municipio_id` (1-50)

### ACTIVIDAD_TURISTICA
- **Campos requeridos**: `id_municipio`, `nombre`, `duracion_horas`, `costo`
- **Rangos numéricos**: `duracion_horas` (0.5 - 240), `costo` (0 - 10,000,000)
- **Longitudes**: `id_municipio` (1-50), `nombre` (3-150)

### ADMINISTRADOR
- **Campos requeridos**: `usuario_id`, `cargo`, `fecha_inicio`
- **Enums**: `cargo` (6 opciones)
- **Longitudes**: `usuario_id` (1-50)

### AEROLINEA
- **Campos requeridos**: `nombre`, `codigo_iata`, `pais_origen`
- **Enums**: Ninguno
- **Longitudes**: `nombre` (2-100), `codigo_iata` (2-3), `pais_origen` (2-100)

### AERONAVE
- **Campos requeridos**: `vehiculo_id`, `codigo_aeronave`, `capacidad_pasajeros`
- **Longitudes**: `vehiculo_id` (1-50), `codigo_aeronave` (3-20)
- **Rangos numéricos**: `capacidad_pasajeros` (1 - 850)

### CLIENTE
- **Campos requeridos**: `usuario_id`
- **Enums**: `nivel_membresia` (5 opciones)
- **Rangos numéricos**: `puntos_fidelidad` (0 - 1,000,000)
- **Longitudes**: `usuario_id` (1-50)

### CLIENTE_VIAJE
- **Campos requeridos**: `id_cliente`, `id_viaje`, `estado`, `fecha_participacion`
- **Enums**: `estado` (5 opciones)
- **Longitudes**: `id_cliente`, `id_viaje` (1-50)

### CUOTA
- **Campos requeridos**: `id_viaje`, `numero_cuota`, `fecha_pago`, `monto`, `estado`
- **Enums**: `estado` (4 opciones)
- **Rangos numéricos**: `numero_cuota` (1 - 100), `monto` (0 - 100,000,000)
- **Longitudes**: `id_viaje` (1-50)

### FACTURA
- **Campos requeridos**: `id_cuota`, `numero_factura`, `fecha_emision`, `total`, `estado`
- **Enums**: `estado` (4 opciones)
- **Rangos numéricos**: `total` (0 - 100,000,000)
- **Longitudes**: `id_cuota` (1-50), `numero_factura` (5-50)

### GPS
- **Campos requeridos**: `latitud`, `longitud`, `ultima_actualizacion`, `estado`
- **Enums**: `estado` (4 opciones)
- **Rangos numéricos**: `latitud` (-90 a 90), `longitud` (-180 a 180)
- **Longitudes**: Ninguna

### GUIA
- **Campos requeridos**: `usuario_id`, `idioma`, `especialidad`
- **Longitudes**: `usuario_id` (1-50), `idioma` (2-50), `especialidad` (3-100)
- **Rangos numéricos**: `calificacion_promedio` (0 - 5)

### GUIA_ACTIVIDAD
- **Campos requeridos**: `id_guia`, `id_actividad`, `fecha_asignacion`, `horario`
- **Longitudes**: `id_guia`, `id_actividad` (1-50), `horario` (3-100)

### HABITACION
- **Campos requeridos**: `id_hotel`, `numero`, `tipo`, `precio_noche`, `capacidad`
- **Enums**: `tipo` (6 opciones)
- **Rangos numéricos**: `precio_noche` (0 - 50,000,000), `capacidad` (1 - 20)
- **Longitudes**: `id_hotel` (1-50), `numero` (1-20)

### ITINERARIO_TRANSPORTE
- **Campos requeridos**: `fecha_salida`, `fecha_llegada`, `id_viaje`, `id_servicio_transporte`
- **Longitudes**: `id_trayecto`, `id_viaje`, `id_servicio_transporte` (1-50)

### MEDIA
- **Campos requeridos**: `title`, `category`, `image_file_id`, `image_embedding`
- **Enums**: `category` (6 opciones)
- **Longitudes**: `title` (3-200), `image_file_id` (1-)

### PLAN
- **Campos requeridos**: `nombre`, `tipo`, `precio_total`
- **Enums**: `tipo` (5 opciones)
- **Rangos numéricos**: `precio_total` (0 - 100,000,000)
- **Longitudes**: `nombre` (3-150)

### PLAN_ACTIVIDAD
- **Campos requeridos**: `id_plan`, `id_actividad`
- **Longitudes**: `id_plan`, `id_actividad` (1-50)

### RESERVA
- **Campos requeridos**: `id_viaje`, `id_habitacion`, `fecha_check_in`, `fecha_check_out`
- **Longitudes**: `id_viaje`, `id_habitacion` (1-50)

### SERVICIO_TRANSPORTE
- **Campos requeridos**: `fecha_inicio`, `fecha_fin`, `costo`, `estado`, `id_vehículo`, `id_trayecto`
- **Enums**: `estado` (5 opciones)
- **Rangos numéricos**: `costo` (0 - 50,000,000)
- **Longitudes**: `id_vehículo`, `id_trayecto` (1-50)

### TARJETA_BANCARIA
- **Campos requeridos**: `id_cliente`, `tipo`, `numero_enmascarado`, `nombre_titular`, `fecha_vencimiento`
- **Enums**: `tipo` (3 opciones)
- **Longitudes**: `numero_enmascarado` (8-19), `nombre_titular` (3-150)

### TRAYECTO
- **Campos requeridos**: `origen`, `destino`, `distancia_km`
- **Rangos numéricos**: `distancia_km` (0 - 50,000)
- **Longitudes**: `origen`, `destino` (2-150)

### USUARIO
- **Campos requeridos**: `nombre`, `apellido`, `email`, `roles`
- **Enums**: `roles` (4 opciones)
- **Rangos numéricos**: Ninguno
- **Longitudes**: `nombre`, `apellido` (2-100), `email` (5-150)

### VEHICULO
- **Campos requeridos**: `tipo`, `placa`, `modelo`, `capacidad`
- **Enums**: `tipo` (6 opciones)
- **Rangos numéricos**: `capacidad` (1 - 1000)
- **Longitudes**: `placa` (5-15), `modelo` (2-100)

### VIAJE
- **Campos requeridos**: `nombre`, `fecha_inicio`, `fecha_fin`, `estado`
- **Enums**: `estado` (5 opciones)
- **Longitudes**: `nombre` (3-200)

### VIAJE_PLAN
- **Campos requeridos**: `id_viaje`, `id_plan`, `fecha_asignacion`, `cantidad_personas`
- **Longitudes**: `id_viaje`, `id_plan` (1-50)

---

## 🔧 Cómo Aplicar los Validators

### Opción 1: MongoDB Compass

1. Abre MongoDB Compass
2. Conecta a tu cluster de Atlas
3. Selecciona la base de datos
4. Click en la colección
5. Ve a la pestaña **Validation**
6. Selecciona **JSON Schema**
7. Pega el validator JSON
8. Configura:
   - **Validation Level**: `moderate` (valida inserts y updates)
   - **Validation Action**: `error` (rechaza documentos inválidos)
9. Click en **Update**

### Opción 2: MongoDB Shell

```bash
mongosh "tu-connection-string"
```

```javascript
use agencia_viajes

// Aplicar validator para carros
db.runCommand({ collMod: "carros", validator: { /* pega aquí */ } })

// Aplicar validator para municipios
db.runCommand({ collMod: "municipios", validator: { /* pega aquí */ } })

// Aplicar validator para hoteles
db.runCommand({ collMod: "hoteles", validator: { /* pega aquí */ } })

// Aplicar validator para actividades turísticas
db.runCommand({ collMod: "actividades_turisticas", validator: { /* pega aquí */ } })

// Aplicar validator para administradores
db.runCommand({ collMod: "administradores", validator: { /* pega aquí */ } })

// Aplicar validator para aerolíneas
db.runCommand({ collMod: "aerolineas", validator: { /* pega aquí */ } })

// Aplicar validator para aeronaves
db.runCommand({ collMod: "aeronaves", validator: { /* pega aquí */ } })

// Aplicar validator para clientes
db.runCommand({ collMod: "clientes", validator: { /* pega aquí */ } })

// Aplicar validator para cliente_viaje
db.runCommand({ collMod: "cliente_viaje", validator: { /* pega aquí */ } })

// Aplicar validator para cuotas
db.runCommand({ collMod: "cuotas", validator: { /* pega aquí */ } })

// Aplicar validator para facturas
db.runCommand({ collMod: "facturas", validator: { /* pega aquí */ } })

// Aplicar validator para gps
db.runCommand({ collMod: "gps", validator: { /* pega aquí */ } })

// Aplicar validator para guías
db.runCommand({ collMod: "guias", validator: { /* pega aquí */ } })

// Aplicar validator para guia_actividad
db.runCommand({ collMod: "guia_actividad", validator: { /* pega aquí */ } })

// Aplicar validator para habitaciones
db.runCommand({ collMod: "habitaciones", validator: { /* pega aquí */ } })

// Aplicar validator para itinerario_transporte
db.runCommand({ collMod: "itinerario_transporte", validator: { /* pega aquí */ } })

// Aplicar validator para media
db.runCommand({ collMod: "media", validator: { /* pega aquí */ } })

// Aplicar validator para planes
db.runCommand({ collMod: "planes", validator: { /* pega aquí */ } })

// Aplicar validator para plan_actividad
db.runCommand({ collMod: "plan_actividad", validator: { /* pega aquí */ } })

// Aplicar validator para reservas
db.runCommand({ collMod: "reservas", validator: { /* pega aquí */ } })

// Aplicar validator para servicios de transporte
db.runCommand({ collMod: "servicios_transporte", validator: { /* pega aquí */ } })

// Aplicar validator para tarjetas bancarias
db.runCommand({ collMod: "tarjetas_bancarias", validator: { /* pega aquí */ } })

// Aplicar validator para trayectos
db.runCommand({ collMod: "trayectos", validator: { /* pega aquí */ } })

// Aplicar validator para usuarios
db.runCommand({ collMod: "usuarios", validator: { /* pega aquí */ } })

// Aplicar validator para viajes
db.runCommand({ collMod: "viajes", validator: { /* pega aquí */ } })

// Aplicar validator para viaje_plan
db.runCommand({ collMod: "viaje_plan", validator: { /* pega aquí */ } })
```

### Opción 3: Desde Node.js

```javascript
const { MongoClient } = require('mongodb');

async function applyValidators() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('agencia_viajes');
  
  // Validator para carros
  await db.command({
    collMod: 'carros',
    validator: { /* pega aquí */ },
    validationLevel: 'moderate',
    validationAction: 'error'
  });
  
  console.log('Validators aplicados correctamente');
  await client.close();
}

applyValidators();
```

---

## ⚙️ Niveles de Validación

- **`strict`**: Valida todos los inserts y updates (más estricto)
- **`moderate`**: Valida inserts y updates de documentos que ya cumplen el esquema (recomendado)
- **`off`**: Desactiva la validación

## 🛡️ Acciones de Validación

- **`error`**: Rechaza operaciones que no cumplen el validator (recomendado para producción)
- **`warn`**: Permite la operación pero registra un warning en los logs

---

## 🧪 Probar Validators

### Test de inserción válida (Carro)

```javascript
db.carros.insertOne({
  vehiculo_id: "VEH001",
  tipo_combustible: "eléctrico",
  transmision: "automática",
  color: "blanco",
  kilometraje: 5000
})
// ✅ Éxito
```

### Test de inserción inválida (Carro)

```javascript
db.carros.insertOne({
  vehiculo_id: "",  // ❌ minLength es 1
  tipo_combustible: "nuclear",  // ❌ No está en el enum
  kilometraje: -100  // ❌ minimum es 0
})
// ❌ Error de validación
```

### Test de inserción válida (Municipio)

```javascript
db.municipios.insertOne({
  nombre: "Cartagena",
  departamento: "Bolívar",
  pais: "Colombia",
  descripcion_turistica: "Ciudad histórica y turística en la costa caribeña colombiana."
})
// ✅ Éxito
```

### Test de inserción válida (Hotel)

```javascript
db.hoteles.insertOne({
  id_administrador: "ADM001",
  nombre: "Hotel Caribe Plaza",
  direccion: "Calle 10 #5-25, Centro Histórico",
  categoria: "5 estrellas",
  municipio_id: "MUN001"
})
// ✅ Éxito
```

---

## 📚 Referencias

- [MongoDB Schema Validation](https://www.mongodb.com/docs/manual/core/schema-validation/)
- [JSON Schema Specification](https://json-schema.org/)
- [MongoDB Validator Best Practices](https://www.mongodb.com/docs/manual/core/schema-validation/specify-json-schema/)
