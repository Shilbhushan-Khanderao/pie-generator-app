#!/bin/bash

# Pie Generator App - Stop Script
# Gracefully stops the application

set -e

APP_NAME="pie-generator-app"

echo "Stopping $APP_NAME..."

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "PM2 not installed. No process to stop."
    exit 0
fi

# Check if app is running
if pm2 list | grep -q "$APP_NAME"; then
    pm2 stop "$APP_NAME"
    echo "$APP_NAME stopped successfully!"
else
    echo "$APP_NAME is not running."
fi
