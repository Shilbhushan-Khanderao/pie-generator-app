#!/bin/bash

# Restart production server with rebuild
echo "Restarting Pie Generator App..."
cd "$(dirname "$0")"

# Stop the server
./stop.sh
sleep 2

# Rebuild and start
echo ""
echo "Rebuilding app..."
cd ..
npm run build > /dev/null 2>&1
echo "✓ Build complete"
echo ""

# Start the server
./scripts/start.sh
