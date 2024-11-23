FROM node:20-alpine AS builder
WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml package.json ./
COPY tsconfig.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./
COPY --from=builder /usr/src/app/tsconfig.json ./

RUN pnpm install

USER node

EXPOSE 3001

CMD ["pnpm", "start"]
