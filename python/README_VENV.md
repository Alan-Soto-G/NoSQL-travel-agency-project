# Entorno Virtual Python - Instrucciones de Uso

## Ubicación del Entorno Virtual

Debido a limitaciones de longitud de ruta en Windows, el entorno virtual se encuentra en:

```
C:\temp_venv\venv
```

## Activar el Entorno Virtual

### En PowerShell:

```powershell
C:\temp_venv\venv\Scripts\Activate.ps1
```

### En CMD:

```cmd
C:\temp_venv\venv\Scripts\activate.bat
```

## Paquetes Instalados

El entorno virtual incluye:

- flask==3.0.0
- transformers>=4.40.0
- torch>=2.6.0
- pillow>=10.4.0

Y todas sus dependencias.

## Ejecutar el Servicio CLIP

```powershell
# Activar el entorno
C:\temp_venv\venv\Scripts\Activate.ps1

# Ejecutar el servicio
python clip_service.py
```

## Usar Python del Entorno Virtual Directamente

Sin activar el entorno, puedes ejecutar comandos usando la ruta completa:

```powershell
C:\temp_venv\venv\Scripts\python.exe clip_service.py
```

## Instalar Paquetes Adicionales

```powershell
C:\temp_venv\venv\Scripts\Activate.ps1
pip install nombre-del-paquete
```

## Notas

- El entorno virtual está completamente configurado y listo para usar
- No es necesario reinstalar los paquetes
- Los requirements.txt fueron actualizados para usar versiones compatibles con tu sistema
