#!/bin/bash

# Pie Generator App - Start Script
# Starts the application using PM2 for continuous operation

set -e

APP_NAME="pie-generator-app"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_DIR="$PROJECT_DIR/logs"

# Create logs directory if it doesn't exist
mkdir -p "$LOG_DIR"

echo "Starting $APP_NAME..."

# Check if PM2 is installed globally
if ! command -v pm2 &> /dev/null; then
    echo "PM2 not found. Installing PM2 globally..."
    npm install -g pm2
fi

# Navigate to project directory
cd "$PROJECT_DIR"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the app if dist doesn't exist
if [ ! -d "dist" ]; then
    echo "Building application..."
    npm run build
fi

# Start the app with PM2 using the ecosystem config
if [ -f "ecosystem.config.js" ]; then
    pm2 start ecosystem.config.js --env production
else
    # Fallback: start with direct command
    pm2 start "npm run preview" --name "$APP_NAME" --log "$LOG_DIR/app.log"
fi

# Save PM2 configuration to restart on reboot
pm2 save
pm2 startup

echo "$APP_NAME started successfully!"
echo "View logs with: pm2 logs $APP_NAME"
