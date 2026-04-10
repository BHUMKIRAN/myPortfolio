FROM node:20-alpine
WORKDIR /app

RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Just declare that these exist. 
# They will pull values from your shell/CI during 'docker build'
ARG CONTENTFUL_SPACE_ID
ARG CONTENTFUL_ACCESS_TOKEN
ARG CONTENTFUL_ENVIRONMENT=master

# Map them to ENV so they are available at runtime
ENV CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID \
    CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN \
    CONTENTFUL_ENVIRONMENT=$CONTENTFUL_ENVIRONMENT \
    NODE_ENV=production

RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]