#!/bin/bash

set -e

GITHUB_REPO="https://github.com/YOUR_USERNAME/warehouse-vuejs-new-main.git"
PROJECT_DIR="/home/ArifFauzan/warehouse-vuejs-new-main"
WEB_DIR="/var/www/html"

echo "=========================================="
echo "  FIRST TIME VPS SETUP - Warehouse Vue.js"
echo "=========================================="
echo ""

# 1. Update system
echo "[1/10] Updating system packages..."
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 20 LTS
echo "[2/10] Installing Node.js 20 LTS..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    echo "   Node.js $(node -v) installed"
else
    echo "   Node.js already installed: $(node -v)"
fi

# 3. Install Nginx
echo "[3/10] Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    sudo apt install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
    echo "   Nginx installed and running"
else
    echo "   Nginx already installed"
fi

# 4. Install Git
echo "[4/10] Installing Git..."
if ! command -v git &> /dev/null; then
    sudo apt install -y git
    echo "   Git installed"
else
    echo "   Git already installed"
fi

# 5. Clone project
echo "[5/10] Cloning project..."
if [ -d "$PROJECT_DIR" ]; then
    echo "   Project directory already exists, pulling latest..."
    cd "$PROJECT_DIR"
    git pull origin main
else
    cd /home/ArifFauzan
    git clone "$GITHUB_REPO"
    cd warehouse-vuejs-new-main
fi

# 6. Install dependencies
echo "[6/10] Installing dependencies..."
npm install

# 7. Build project
echo "[7/10] Building project..."
npm run build

# 8. Setup Nginx
echo "[8/10] Configuring Nginx..."
sudo tee /etc/nginx/sites-available/warehouse > /dev/null << 'EOF'
server {
    listen 80;
    server_name _;

    root /var/www/html;
    index index.html;

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 256;

    # Proxy API ke backend (backend di server yang sama)
    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Hapus default config
sudo rm -f /etc/nginx/sites-enabled/default

# Aktifkan config warehouse
sudo ln -sf /etc/nginx/sites-available/warehouse /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
echo "   Nginx configured"

# 9. Deploy ke web root
echo "[9/10] Deploying to web root..."
sudo rm -rf "$WEB_DIR"/*
sudo cp -r dist/* "$WEB_DIR"/
sudo chown -R www-data:www-data "$WEB_DIR"
echo "   Deployed to $WEB_DIR"

# 10. Install Certbot (opsional)
echo "[10/10] Installing Certbot for SSL..."
sudo apt install -y certbot python3-certbot-nginx 2>/dev/null || true

# IP Address
IP_ADDRESS=$(hostname -I | awk '{print $1}')

echo ""
echo "=========================================="
echo "  ✅ SETUP COMPLETE!"
echo "=========================================="
echo ""
echo "🌐 Website: http://$IP_ADDRESS"
echo ""
echo "📋 Selanjutnya:"
echo "   1. Push project ke GitHub:"
echo "      git remote add origin https://github.com/YOUR_USERNAME/warehouse-vuejs-new-main.git"
echo "      git add . && git commit -m 'first commit' && git push -u origin main"
echo ""
echo "   2. Set GitHub Secrets:"
echo "      - VPS_HOST      = $IP_ADDRESS"
echo "      - VPS_USERNAME  = ArifFauzan"
echo "      - VPS_SSH_KEY   = (private key SSH)"
echo ""
echo "   3. Setelah domain siap, jalankan SSL:"
echo "      sudo certbot --nginx -d domain-kamu.com"
echo ""
echo "   4. Deploy manual kapan saja:"
echo "      cd $PROJECT_DIR && ./deploy.sh"
echo ""
echo "=========================================="
