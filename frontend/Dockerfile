# --- Stage 1: Dependencies ---
FROM node:20-bullseye AS deps
WORKDIR /app

# The * wildcard prevents Docker from crashing if pnpm-lock.yaml isn't committed yet
COPY package.json pnpm-lock.yaml* ./

# Install pnpm globally and install packages cleanly on the fly
RUN npm install -g pnpm && pnpm install

# --- Stage 2: Builder ---
FROM node:20-bullseye AS builder
WORKDIR /app

# Install pnpm in this stage so it can execute the build command
RUN npm install -g pnpm

# Bring over the installed node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run the next.js production compile stage
RUN pnpm build

# --- Stage 3: Production Runner ---
FROM node:20-bullseye AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install pnpm in the final runtime layer so it can run 'pnpm start'
RUN npm install -g pnpm

# Only copy over the minimal required production compilation artifacts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["pnpm", "start"]
