# 1. Setup & Install Dependencies
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable

# Install dependencies first (better caching)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .

# ARGS for Next.js build-time variables
ARG CONTENTFUL_ENVIRONMENT=master
ENV CONTENTFUL_ENVIRONMENT=$CONTENTFUL_ENVIRONMENT \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

RUN pnpm build

# 2. Production Runner (The actual small image)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

# Copy only what is needed to run the app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]