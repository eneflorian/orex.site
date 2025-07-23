module.exports = {
  apps: [
    {
      name: 'orex-app',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/orex-app',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/orex-app-error.log',
      out_file: '/var/log/pm2/orex-app-out.log',
      log_file: '/var/log/pm2/orex-app.log',
      time: true
    }
  ]
};