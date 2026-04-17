# syntax=docker/dockerfile:1.7

# Build context = repo root (see apps/backend/docker-compose.yml)

# ---------- Base: pnpm via corepack ----------
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH" \
    CI=true
RUN corepack enable
WORKDIR /repo

# ---------- Install workspace deps (cached on manifests) ----------
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json apps/backend/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --filter aset-backend...

# ---------- Build: prisma generate + esbuild bundle ----------
FROM deps AS build
COPY apps/backend apps/backend
RUN pnpm --filter aset-backend build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm --filter aset-backend --prod --legacy deploy /prod

# ---------- Runtime: slim image, prod deps only ----------
FROM node:20-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

COPY --from=build /prod/node_modules ./node_modules
COPY --from=build /repo/apps/backend/dist ./dist
COPY --from=build /repo/apps/backend/prisma ./prisma
COPY --from=build /repo/apps/backend/package.json ./package.json

USER node
EXPOSE 5000
CMD ["node", "dist/index.js"]
