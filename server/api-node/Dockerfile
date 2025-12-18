# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the app dependencies
RUN npm install
RUN npm run migrate
RUN npm run generate

# Copy the rest of the application code to the container
COPY . .

# Expose a port
EXPOSE 9002

# Start the Node.js application
CMD ["npx", "ts-node", "src/main.ts"]