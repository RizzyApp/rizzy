# Use the official Node.js image to build the React app
FROM node:20 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the React app code
COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the React app
RUN npm run build

# Use an Nginx image to serve the build
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to serve the static content
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]