# Etapa 1: Construcción de la aplicación Back (Node.js)
FROM node:22-slim AS build

# Directorio de trabajo para la compilación
WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY package*.json ./
COPY tsconfig*.json ./
COPY nx.json ./

# Instalar las dependencias necesarias
RUN npm install --verbose

# Copiar el código fuente para construir la aplicación Backend
COPY . .

# Construir la aplicación (los archivos compilados estarán en dist/apps/back)
RUN npm run build:back --verbose

# Etapa 2: Imagen final para producción
FROM node:22-alpine

ENV APP_DIR /home/app-back/

# Instalar dependencias del sistema necesarias para algunos paquetes npm nativos
RUN apk update && apk add --no-cache \
    graphicsmagick \
    ghostscript \
    python3 \
    make \
    g++ \
    libc6-compat \
    ca-certificates

# Crear el grupo y usuario de la aplicación
RUN addgroup --system app-back && \
    adduser --system -G app-back app-back

# Copiar los archivos compilados de la etapa de construcción
COPY --from=build /app/dist/apps/back ${APP_DIR}

WORKDIR ${APP_DIR}

# Instalar solo dependencias de producción
ENV PYTHON=/usr/bin/python3
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false && \
    npm install --omit=dev

# Crear directorio de uploads
RUN mkdir -p ${APP_DIR}uploads

# Cambiar la propiedad de los archivos
RUN chown -R app-back:app-back .

# Cambiar a un usuario no root
USER app-back

# Exponer el puerto
EXPOSE 3200

# Ejecutar la aplicación
CMD [ "node", "main.js" ]
