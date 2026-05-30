# Frontend Dockerfile for Next.js (pnpm)
FROM node:20-bullseye AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

FROM node:20-bullseye AS builder
WORKDIR /app

# FIX 1: Install pnpm here so this stage can execute "pnpm build"
RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:20-bullseye AS runner
WORKDIR /app
ENV NODE_ENV=production

# FIX 2: Install pnpm here so the final container can execute "pnpm start"
RUN npm install -g pnpm

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["pnpm", "start"]
