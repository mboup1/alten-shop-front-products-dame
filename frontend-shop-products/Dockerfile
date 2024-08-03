# Step 1: Use a base image for Nginx
FROM nginx:alpine

# Copy the built files from the build stage to the Nginx directory
COPY dist/frontend-shop-products /usr/share/nginx/html

EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]

# Build stage
# FROM node:14 as build

# Set the working directory
# WORKDIR /app

# Copy dependency files
# COPY package*.json ./

# Install dependencies
# RUN npm install

# Install Angular CLI globally
# RUN npm install -g @angular/cli

# Copy the rest of the application code
# COPY . .

# Install webpack and webpack-cli globally
# RUN npm install -g webpack webpack-cli

# Build the application in production mode
# RUN npm run build --configuration=production

# Production stage
# FROM nginx:alpine

# Copy the built application from the build stage
# COPY --from=build app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
