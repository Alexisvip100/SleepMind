# -----------------------
# Etapa 1: Build (builder)
# -----------------------
FROM node:22-bookworm-slim AS builder

# Zona horaria y dependencias de compilación
ENV TZ=America/Mexico_City
RUN apt-get update \
     && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
     gcc tzdata \
     && ln -fs /usr/share/zoneinfo/$TZ /etc/localtime \
     && echo "$TZ" > /etc/timezone \
     && apt-get clean \
     && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar package.json y lock para cache de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluye dev)
RUN npm ci

# Copiar configuraciones y código fuente
COPY tsconfig.json ./
COPY src ./src

# Compilar TypeScript
RUN npm run build

# --------------------------
# Etapa 2: Runtime (production)
# --------------------------
FROM node:22-bookworm-slim

# Zona horaria
ENV TZ=America/Mexico_City
RUN apt-get update \
     && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends tzdata \
     && ln -fs /usr/share/zoneinfo/$TZ /etc/localtime \
     && echo "$TZ" > /etc/timezone \
     && apt-get clean \
     && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar artefactos compilados y dependencias
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Puerto configurable desde docker-compose con ARG
ARG PORT_SLEEP=3002
ENV PORT=${PORT_SLEEP}
EXPOSE ${PORT}

# Señal para detener correctamente
STOPSIGNAL SIGTERM

# Comando por defecto: ejecuta el JS compilado
CMD ["npm", "run", "start"]