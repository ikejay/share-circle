# backend/Dockerfile.dev
FROM node:20-alpine

WORKDIR /app

# Copy package files first (caching optimization)
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Default command (overridden by docker-compose)
CMD ["npm", "run", "dev"]