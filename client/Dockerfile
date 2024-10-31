# Use the official Node.js image to build the React app
FROM node:20 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the React app code
COPY . .

# Build the React app
RUN npm run build

# Use an Nginx image to serve the build
FROM nginx:alpine
COPY --from=build /app/dist  /usr/share/nginx/html
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]