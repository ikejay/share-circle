# backend/Dockerfile.dev
FROM node:24-alpine

WORKDIR /app

# Copy package files first (caching optimization)
COPY package.json .

COPY yarn.lock .

# Install dependencies
RUN yarn global add @quasar/cli

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 9000

# Default command (overridden by docker-compose)
CMD ["npm", "run", "dev"]