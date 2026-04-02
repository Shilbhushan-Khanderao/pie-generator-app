#!/bin/bash

# Check server status
cd "$(dirname "$0")/.."

echo "Pie Generator App Status"
echo "========================"

if [ -f .server.pid ]; then
    PID=$(cat .server.pid)
    if kill -0 "$PID" 2>/dev/null; then
        echo "✓ Status: RUNNING"
        echo "  PID:     $PID"
        echo "  Local:   http://localhost:4000"
        echo "  Network: http://10.212.13.148:4000"
        
        if [ -f logs/server.log ]; then
            echo ""
            echo "Recent logs:"
            tail -5 logs/server.log
        fi
    else
        echo "✗ Status: NOT RUNNING"
        echo "  PID file found but process is dead: $PID"
    fi
else
    echo "✗ Status: NOT RUNNING"
    echo "  No PID file found"
fi
