# ==========================================
# 1. Base Stage
# ==========================================
FROM node:22-alpine AS base

# Install dumb-init for proper PID 1 signal handling
RUN apk add --no-cache dumb-init libc6-compat
WORKDIR /app

# ==========================================
# 2. Dependencies Stage
# ==========================================
FROM base AS dependencies

COPY package*.json ./
COPY prisma.config.ts ./
COPY src/infrastructure/database/prisma ./src/infrastructure/database/prisma/

RUN npm ci

# ==========================================
# 3. Development Stage (Hot-reloading in container)
# ==========================================
FROM base AS development

ENV NODE_ENV=development

COPY package*.json ./
COPY prisma.config.ts ./
COPY src/infrastructure/database/prisma ./src/infrastructure/database/prisma/

RUN npm install
COPY . .
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]

# ==========================================
# 4. Builder Stage
# ==========================================
FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build
RUN npm prune --omit=dev

# ==========================================
# 5. Production Stage
# ==========================================
FROM base AS production

ENV NODE_ENV=production

# Use non-root node user for security
USER node

# Copy production artifacts with correct ownership
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/src/infrastructure/mail/templates ./src/infrastructure/mail/templates
COPY --chown=node:node --from=builder /app/src/infrastructure/database/prisma ./src/infrastructure/database/prisma
COPY --chown=node:node --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "dist/main"]