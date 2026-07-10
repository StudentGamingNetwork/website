# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=24.11.1

FROM node:${NODE_VERSION}-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app


# -----------------------
# Build
# -----------------------
FROM base AS build

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm fetch --frozen-lockfile

COPY . .

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --offline

ARG VITE_BACKEND_HOST
ARG VITE_GOOGLE_OAUTH_CLIENT_ID
ARG VITE_REDIRECT_URI

ENV VITE_BACKEND_HOST=$VITE_BACKEND_HOST
ENV VITE_GOOGLE_OAUTH_CLIENT_ID=$VITE_GOOGLE_OAUTH_CLIENT_ID
ENV VITE_REDIRECT_URI=$VITE_REDIRECT_URI

RUN pnpm --filter @sgnw/frontend build
RUN pnpm --filter @sgnw/backend build

RUN rm -rf /prod/backend \
    && mkdir -p /prod \
    && pnpm --filter @sgnw/backend deploy --prod /prod/backend \
    && mkdir -p /prod/backend/dist \
    && cp -R backend/dist/. /prod/backend/dist/ \
    && find /prod/backend/dist -name "*.map" -type f -delete


# -----------------------
# Runtime
# -----------------------
FROM node:${NODE_VERSION}-bookworm-slim AS app

ENV NODE_ENV=production
ENV BACKEND_HOST=0.0.0.0
ENV BACKEND_PORT=3000

WORKDIR /app

RUN groupadd -g 1001 appgroup \
    && useradd -u 1001 -g appgroup -m -d /app -s /bin/false appuser

COPY --from=build --chown=appuser:appgroup /prod/backend ./backend
COPY --from=build --chown=appuser:appgroup /app/frontend/dist ./frontend/dist

RUN mkdir -p /app/backend/upload /app/dumps /app/overlay/dist \
    && chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

WORKDIR /app/backend

CMD ["node", "dist/server.js"]