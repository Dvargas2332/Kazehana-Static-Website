# ── Etapa 1: build ──────────────────────────────────────────────
# Compila el API (boot + migrador) en bundles ESM autocontenidos.
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json tsconfig.app.json tsconfig.node.json tsconfig.server.json ./
COPY vite.config.ts ./
COPY api ./api
COPY db ./db
COPY src ./src

RUN npm run build:server

# ── Etapa 2: runtime ────────────────────────────────────────────
# El bundle incluye las dependencias, así que no hace falta node_modules.
# Al arrancar: aplica las migraciones de db/migrations y levanta el API.
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /app/dist/boot.js /app/dist/migrate.js ./dist/
COPY db/migrations ./db/migrations

EXPOSE 3000
CMD ["sh", "-c", "node dist/migrate.js && node dist/boot.js"]
