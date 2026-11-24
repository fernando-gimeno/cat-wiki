# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=26-alpine

# ---------- base ----------
FROM node:${NODE_VERSION} AS base
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---------- deps ----------
FROM base AS deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,id=npm,target=/root/.npm \
    npm ci --no-fund --no-audit

# ---------- builder ----------
FROM base AS builder
# NEXT_PUBLIC_* se inyecta en el bundle en build time.
# CAT_API_KEY se usa para prerenderizar la home durante el build (ISR la refresca luego).
ARG NEXT_PUBLIC_SITE_URL
ARG CAT_API_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    CAT_API_KEY=$CAT_API_KEY
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# --webpack: Turbopack lanza un proceso Node aparte para PostCSS/Tailwind con un
# timeout fijo de 30s que en VPS con pocos recursos falla
# ("timed out waiting for the Node.js process to connect").
RUN npm run build -- --webpack

# ---------- runner ----------
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/robots.txt >/dev/null || exit 1

CMD ["node", "server.js"]
