FROM node:20.3-alpine@sha256:f77f29bc47124b393d8e7ae947be385e851d7c448d85ab87a4c077af84ee8ea2 AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN yarn global add pnpm && pnpm install --frozen-lockfile
COPY . .

FROM base as dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn global add pnpm
RUN pnpm prisma generate
CMD ["pnpm", "run", "dev"]


FROM base AS prod
LABEL org.opencontainers.image.description "SOL Panel"
LABEL org.opencontainers.image.source=https://github.com/trustless-engineering/sol-panel
LABEL org.opencontainers.image.licenses="Apache 2.0"
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn global add pnpm
RUN pnpm prisma generate

CMD ["pnpm", "run", "start:prod"]