# Use an official Node.js image
FROM node:22

WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker's caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Expose port 3000 and run the Next.js production server
EXPOSE 3000
CMD ["npm", "start"]
