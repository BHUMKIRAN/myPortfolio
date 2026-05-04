FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# build args (ONLY if needed at build time)
ARG CONTENTFUL_ENVIRONMENT=master
ENV CONTENTFUL_ENVIRONMENT=$CONTENTFUL_ENVIRONMENT \
    NODE_ENV=production

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]