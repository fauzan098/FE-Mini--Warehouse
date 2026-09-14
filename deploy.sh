#!/bin/bash

set -e

REPO_DIR="/home/ArifFauzan/warehouse-vuejs-new-main"
WEB_DIR="/var/www/html"
BRANCH="main"

echo "🚀 Starting deployment..."

# Pull latest code
cd "$REPO_DIR"
echo "📥 Pulling latest code from $BRANCH..."
git pull origin "$BRANCH"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Build project
echo "🔨 Building project..."
npm run build

# Backup current build
if [ -d "$WEB_DIR" ]; then
    echo "💾 Backing up current build..."
    sudo cp -r "$WEB_DIR" "${WEB_DIR}.bak.$(date +%Y%m%d%H%M%S)"
fi

# Deploy to web root
echo "🚀 Deploying to $WEB_DIR..."
sudo rm -rf "$WEB_DIR"/*
sudo cp -r dist/* "$WEB_DIR"/
sudo chown -R www-data:www-data "$WEB_DIR"

# Reload Nginx
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

# Cleanup old backups (keep last 3)
echo "🧹 Cleaning up old backups..."
sudo ls -dt ${WEB_DIR}.bak.* 2>/dev/null | tail -n +4 | xargs sudo rm -rf 2>/dev/null || true

echo "✅ Deployment complete!"
echo "🌐 Site is live at http://$(hostname -I | awk '{print $1}')"
