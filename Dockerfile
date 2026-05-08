# --- STAGE 1: Dependencies ---
FROM node:24-alpine AS deps
WORKDIR /app

# Copy only package files for both
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install server dependencies
RUN cd server && npm ci

# Install client dependencies
RUN cd client && npm ci


# --- STAGE 2: Builder ---
FROM node:24-alpine AS builder
WORKDIR /app

# Copy node_modules from the deps stage
COPY --from=deps /app/server/node_modules ./server/node_modules
COPY --from=deps /app/client/node_modules ./client/node_modules

# Copy the rest of the source code
COPY . .

# Run builds locally within each folder
# This uses the local node_modules/.bin which is guaranteed to exist
RUN cd server && npm run build
RUN cd client && npm run build

# Remove development dependencies from server to save space
#RUN cd server && npm prune --omit=dev


# --- STAGE 3: Runner ---
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 1. Copy the production node_modules for the server
COPY --from=builder /app/server/node_modules ./server/node_modules

# 2. Copy the built code
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/client/dist ./client/dist

# 3. Copy package.json (helpful for metadata/scripts)
COPY --from=builder /app/server/package.json ./server/package.json

EXPOSE 3001

# Run the server from its dist folder
CMD ["node", "server/dist/main"]
