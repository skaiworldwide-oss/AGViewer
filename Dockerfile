# Stage 1: Build
FROM node:14-alpine AS builder
WORKDIR /agviewer

# Install dependencies and build
COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npm run deploy

# Stage 2: Run (Final Minimal Image)
FROM node:14-alpine
WORKDIR /agviewer

# Add non-root user
RUN adduser -D appuser

# Copy only required files from builder stage
COPY --chown=appuser:appuser --from=builder /agviewer .
USER appuser

# Expose port and run app
EXPOSE 3000
CMD ["npx", "pm2-runtime", "start", "ecosystem.config.js", "--env", "release"]
