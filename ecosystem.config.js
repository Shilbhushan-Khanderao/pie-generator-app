module.exports = {
  apps: [
    {
      name: 'pie-generator-app',
      script: './start-app.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 4000
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      listen_timeout: 10000,
      kill_timeout: 5000,
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000
    }
  ],
  deploy: {
    production: {
      user: 'node',
      host: 'your-server-ip',
      ref: 'origin/main',
      repo: 'your-repo-url',
      path: '/var/www/pie-generator-app',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
