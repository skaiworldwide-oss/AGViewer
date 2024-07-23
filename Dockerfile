# Use a base node image
FROM node:14-slim

# Install global dependencies
RUN npm install -g pm2

# Set the working directory
WORKDIR /agviewer

# Copy the rest of the application files
COPY . .

# Build the source
RUN npm run deploy

# Start the application with pm2
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "release"]

# Expose the necessary port (assuming 3000, adjust if needed)
EXPOSE 3000
