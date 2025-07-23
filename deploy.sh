#!/bin/bash

# Deploy script for orex.site
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment to orex.site..."

# Server details
SERVER_HOST="64.225.49.128"
SERVER_USER="root"
SERVER_PATH="/var/www/orex-app"
APP_NAME="orex-app"

# Build the application
echo "📦 Building application..."
npm run build

# Deploy files
echo "📤 Deploying files to server..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.github' \
  --exclude '.next/cache' \
  --exclude 'deploy.sh' \
  ./ ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/

# Install dependencies and restart on server
echo "🔄 Installing dependencies and restarting application..."
ssh ${SERVER_USER}@${SERVER_HOST} "
  cd ${SERVER_PATH} &&
  npm ci --only=production &&
  npm run build &&
  pm2 restart ${APP_NAME} || pm2 start npm --name ${APP_NAME} -- start
"

echo "✅ Deployment completed successfully!"
echo "🌐 Your application should be available at orex.site"