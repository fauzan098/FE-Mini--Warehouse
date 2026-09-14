#!/bin/bash

set -e

echo "🚀 Starting VPS setup for Warehouse Vue.js..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 LTS
echo "📦 Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js
echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"

# Install Nginx
echo "🌐 Installing Nginx..."
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Install Git
echo "📥 Installing Git..."
sudo apt install -y git

# Clone project
echo "📥 Cloning project..."
cd /home/ArifFauzan
sudo git clone https://github.com/YOUR_USERNAME/warehouse-vuejs-new-main.git
cd warehouse-vuejs-new-main

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Build project
echo "🔨 Building project..."
npm run build

# Setup Nginx
echo "⚙️ Configuring Nginx..."
sudo cp nginx.conf /etc/nginx/sites-available/warehouse
sudo ln -sf /etc/nginx/sites-available/warehouse /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Deploy to web root
echo "🚀 Deploying to web root..."
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html/

# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx

# Install Certbot for SSL (optional)
echo "🔐 Installing Certbot for SSL..."
sudo apt install -y certbot python3-certbot-nginx

echo ""
echo "✅ VPS setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update nginx.conf server_name with your domain/IP"
echo "2. Run: sudo certbot --nginx -d your-domain.com (after setting up domain)"
echo "3. To deploy updates, run: ./deploy.sh"
echo ""
echo "🌐 Site is live at: http://$(hostname -I | awk '{print $1}')"
