# Imagen base ligera con Python 3.12
FROM python:3.12-slim

# Configuración de timezone
ENV TZ=America/Mexico_City
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
       tzdata build-essential \
    && ln -fs /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo "$TZ" > /etc/timezone \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY requirements.txt ./

# Instalar dependencias (FastAPI, Uvicorn, google-generativeai, etc.)
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código de la app
COPY . .

# Puerto de FastAPI
ARG PORT_AI= 8000
ENV PORT=${PORT_AI}
EXPOSE ${PORT}

# Comando por defecto (arranca FastAPI con Uvicorn)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]