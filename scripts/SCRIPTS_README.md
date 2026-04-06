# Application Management Scripts

These scripts manage the lifecycle of the Pie Generator App for continuous server operation.

## Prerequisites

1. **Node.js** - Install from https://nodejs.org/
2. **PM2** - Install globally (recommended):
   ```bash
   npm install -g pm2
   ```
   Or let the start.sh script install it automatically.

## Scripts Overview

### 1. **start.sh** - Start the Application
Starts the application with PM2 process management.

```bash
bash scripts/start.sh
```

**What it does:**
- Installs PM2 if not already installed
- Installs dependencies if needed
- Builds the application
- Starts the app with PM2
- Configures auto-restart on server reboot

### 2. **stop.sh** - Stop the Application
Gracefully stops the running application.

```bash
bash scripts/stop.sh
```

**What it does:**
- Stops the PM2 process
- Allows graceful shutdown

### 3. **restart.sh** - Restart the Application
Stops, rebuilds, and starts the application.

```bash
bash scripts/restart.sh
```

**What it does:**
- Stops the running app
- Rebuilds the app
- Starts the app

### 4. **status.sh** - Check Application Status
Shows the current status of the application.

```bash
bash scripts/status.sh
```

**What it does:**
- Shows PM2 process list
- Displays app status and details
- Shows recent logs

## Quick Start

1. **Make scripts executable** (one-time setup):
   ```bash
   chmod +x scripts/*.sh
   ```

2. **Start the application**:
   ```bash
   ./scripts/start.sh
   ```

3. **Check status**:
   ```bash
   ./scripts/status.sh
   ```

4. **View live logs**:
   ```bash
   pm2 logs pie-generator-app
   ```

## PM2 Configuration

The `ecosystem.config.js` file configures:
- **Auto-restart**: Automatically restarts if the process crashes
- **Memory limit**: Restarts if exceeds 500MB
- **Log files**: Stores logs in the `logs/` directory
- **Port**: Runs on port 4173 (configurable)

## Useful PM2 Commands

```bash
# View all processes
pm2 list

# View real-time logs
pm2 logs pie-generator-app

# View logs from a specific app
pm2 logs pie-generator-app --lines 100

# Restart the app
pm2 restart pie-generator-app

# Delete from PM2
pm2 delete pie-generator-app

# Save current process list (for reboot)
pm2 save

# Setup startup on reboot
pm2 startup

# View ecosystem config
pm2 show pie-generator-app
```

## Setup for Auto-Start on Server Reboot

After starting the app with the start.sh script, run:

```bash
pm2 save
pm2 startup
```

This creates a system startup script that will automatically restart your app when the server reboots.

## Logs

Application logs are stored in:
- **Output logs**: `logs/out.log`
- **Error logs**: `logs/error.log`

View logs with:
```bash
pm2 logs pie-generator-app
```

## Environment Variables

Edit `ecosystem.config.js` to change:
- `PORT`: Server port (default: 4173)
- `NODE_ENV`: Node environment (default: production)
- `max_memory_restart`: Memory limit for auto-restart (default: 500M)

## Troubleshooting

**Scripts won't execute:**
```bash
chmod +x scripts/*.sh
```

**PM2 not found:**
```bash
npm install -g pm2
```

**Port already in use:**
1. Change PORT in ecosystem.config.js
2. Or find and kill the process using the port:
   ```bash
   lsof -i :4173
   kill -9 <PID>
   ```

**App won't start:**
1. Check logs: `pm2 logs pie-generator-app`
2. Verify dependencies: `npm install`
3. Test build: `npm run build`

## Deployment Tips

1. Copy all files to your server
2. Run `./scripts/start.sh` in the project directory
3. Configure your web server (nginx/Apache) to proxy requests to http://localhost:4173
4. Use `pm2 save` and `pm2 startup` for persistent operation

## Notes

- The app runs on **port 4173** by default
- Consider using a reverse proxy (nginx/Apache) in production
- Set up SSL/TLS certificates if needed
- Monitor disk space for logs
