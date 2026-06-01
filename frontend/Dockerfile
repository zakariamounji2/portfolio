# --- Stage 1: Build Stage ---
FROM node:20-bullseye AS builder
WORKDIR /app

RUN npm install -g pnpm

# Copy package configurations
COPY package.json pnpm-lock.yaml* ./

# Install dependencies cleanly
RUN pnpm install

# Copy the rest of your source code (Safe from overwriting node_modules now)
COPY . .

# Run the next.js production build
RUN pnpm build

# --- Stage 2: Production Runner ---
FROM node:20-bullseye AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g pnpm

# Only copy over minimal required production execution artifacts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["pnpm", "start"]
