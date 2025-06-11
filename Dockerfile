# Use lightweight Node.js image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies (use --legacy-peer-deps in case of npm issues)
RUN npm install 

# Copy the rest of the project files
COPY . .

# Expose Vite default development port
EXPOSE 5173

# Set the environment to development
ENV NODE_ENV=development

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
