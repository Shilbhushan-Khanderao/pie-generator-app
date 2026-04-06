#!/bin/bash

# Pie Generator App - Status Script
# Shows the current status of the application

APP_NAME="pie-generator-app"

echo "=== $APP_NAME Status ==="
echo ""

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "PM2 is not installed."
    exit 1
fi

# Show PM2 list
echo "PM2 Process Status:"
pm2 list | grep -E "id|App name|status|$APP_NAME" || echo "No processes found"

echo ""
echo "Detailed Status:"
if pm2 list | grep -q "$APP_NAME"; then
    pm2 show "$APP_NAME" 2>/dev/null || echo "Unable to show detailed status"
else
    echo "❌ $APP_NAME is NOT running"
fi

echo ""
echo "Recent Logs (last 20 lines):"
pm2 logs "$APP_NAME" --lines 20 --nostream 2>/dev/null || echo "No logs available"
