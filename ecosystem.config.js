module.exports = {
  apps: [
    {
      name: 'orex-site',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/orex.site',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/orex-site-error.log',
      out_file: '/var/log/pm2/orex-site-out.log',
      log_file: '/var/log/pm2/orex-site.log',
      time: true
    }
  ]
};