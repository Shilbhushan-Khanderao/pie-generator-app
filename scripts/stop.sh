#!/bin/bash

# Stop production server
echo "Stopping Pie Generator App..."
cd "$(dirname "$0")/.."

if [ -f .server.pid ]; then
    PID=$(cat .server.pid)
    if kill -0 "$PID" 2>/dev/null; then
        kill "$PID"
        sleep 1
        # Force kill if still running
        if kill -0 "$PID" 2>/dev/null; then
            kill -9 "$PID"
            echo "✓ Server force stopped (PID: $PID)"
        else
            echo "✓ Server stopped gracefully (PID: $PID)"
        fi
        rm .server.pid
    else
        echo "✗ Server process not found (PID: $PID)"
        rm .server.pid
    fi
else
    # If no PID file, try to kill by process name
    if pkill -f "serve -s build -l 4000" 2>/dev/null; then
        echo "✓ Server stopped"
    else
        echo "✗ No running server found"
    fi
fi
