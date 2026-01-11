# Next.js + Payload CMS + PostgreSQL Dockerfile (standalone)
#
# Build commands:
#   ARM64 (Raspberry Pi 4/5): docker build --platform linux/arm64 -t app:latest .
#   AMD64 (x86 server):       docker build --platform linux/amd64 -t app:latest .

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# ============================================
# Stage 2: Builder
# ============================================
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable pnpm && pnpm run build

# ============================================
# Stage 3: Production Runner (standalone)
# ============================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
