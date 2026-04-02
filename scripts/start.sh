#!/bin/bash

# Start production server as daemon (persists after terminal closes)
echo "Starting Pie Generator App on port 4000..."
cd "$(dirname "$0")/.."

# Check if server is already running
if [ -f .server.pid ]; then
    PID=$(cat .server.pid)
    if kill -0 "$PID" 2>/dev/null; then
        echo "✓ Server is already running with PID: $PID"
        echo "  Local:   http://localhost:4000"
        echo "  Network: http://10.212.13.148:4000"
        exit 0
    fi
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Start the server in background with nohup (survives terminal close)
nohup npx serve -s build -l 4000 > logs/server.log 2>&1 &
PID=$!
echo $PID > .server.pid

echo "✓ Server started successfully!"
echo "  PID:     $PID"
echo "  Local:   http://localhost:4000"
echo "  Network: http://10.212.13.148:4000"
echo "  Logs:    logs/server.log"
echo ""
echo "The server will continue running even after you close this terminal."
