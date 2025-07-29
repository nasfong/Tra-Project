# Step 1: Build the React app
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build the project
COPY . .
RUN npm run build

# Step 2: Serve the app with NGINX
FROM nginx:alpine

# Copy the built React files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a default nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
