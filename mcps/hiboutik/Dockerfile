# syntax=docker/dockerfile:1
# Build context: repository root (docker build -f mcps/hiboutik/Dockerfile .)

# ─── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:24-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@11.10.0 --activate

WORKDIR /app

# Copy workspace manifests first (better layer caching)
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.json ./

# Copy package manifests for all workspace members
COPY packages/shared-mcp/package.json ./packages/shared-mcp/package.json
COPY mcps/hiboutik/package.json ./mcps/hiboutik/package.json

# Install all dependencies (frozen lockfile)
RUN pnpm install --frozen-lockfile

# Copy source for the packages we need to build
COPY packages/shared-mcp/ ./packages/shared-mcp/
COPY mcps/hiboutik/ ./mcps/hiboutik/

# Build shared package first, then hiboutik
RUN pnpm --filter @mcp-catalog/shared build && \
    pnpm --filter @mcp-catalog/hiboutik build

# Use pnpm deploy to produce a self-contained production bundle
# (resolves workspace dependencies and copies only prod deps)
RUN pnpm --filter @mcp-catalog/hiboutik deploy --prod --legacy /app/deploy

# ─── Stage 2: Production image ───────────────────────────────────────────────
FROM node:24-alpine AS runner

WORKDIR /app

# Copy the self-contained deploy bundle (node_modules + dist already included)
COPY --from=builder /app/deploy ./

# Run as non-root user
USER node

# HTTP transport by default for remote deployments
ENV TRANSPORT=http
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/index.js"]
