FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source
COPY . .

# Cloud Run requires port 8080
EXPOSE 8080

# Start app
CMD ["node", "server.js"]
