FROM node:20-alpine AS base

RUN corepack enable && corepack prepare pnpm@10.20.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

FROM base AS dependencies

RUN pnpm install --frozen-lockfile

FROM base AS development

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev", "--host", "0.0.0.0"]

FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

RUN pnpm build

FROM nginx:alpine AS production

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]