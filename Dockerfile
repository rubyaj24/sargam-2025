# Use Node.js 20 image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install -g pm2 && npm install

# Copy all source files
COPY . .

# Expose Vite's default port
EXPOSE 80

# Use PM2 to run Vite in the background
CMD ["pm2-runtime", "npm", "--", "run", "dev"]
