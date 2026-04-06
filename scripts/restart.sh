#!/bin/bash

# Pie Generator App - Restart Script
# Stops and starts the application with a fresh build

set -e

APP_NAME="pie-generator-app"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "Restarting $APP_NAME..."

# Stop the app
if [ -f "$SCRIPT_DIR/stop.sh" ]; then
    bash "$SCRIPT_DIR/stop.sh"
fi

# Small delay to ensure clean shutdown
sleep 2

# Rebuild the app
echo "Rebuilding application..."
cd "$PROJECT_DIR"
npm run build

# Start the app
if [ -f "$SCRIPT_DIR/start.sh" ]; then
    bash "$SCRIPT_DIR/start.sh"
fi

echo "$APP_NAME restarted successfully!"
