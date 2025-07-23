#!/bin/bash

# Deploy script for orex.site
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment to orex.site..."

# Server details
SERVER_HOST="64.225.49.128"
SERVER_USER="root"
SERVER_PATH="/var/www/orex.site"
APP_NAME="orex-site"

# Deploy using git pull on server
echo "📤 Pulling latest changes on server..."
ssh ${SERVER_USER}@${SERVER_HOST} "
  cd ${SERVER_PATH} &&
  git pull origin main &&
  npm ci &&
  npm run build &&
  pm2 restart ${APP_NAME} || pm2 start npm --name ${APP_NAME} -- start
"

echo "✅ Deployment completed successfully!"
echo "🌐 Your application should be available at orex.site"