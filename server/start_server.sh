#!/bin/bash

# Navigate to server directory if not already there
# cd "$(dirname "$0")"

echo "🌟 Starting STO Server..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️ Warning: .env file not found. Creating a template..."
    cp .env.example .env 2>/dev/null || echo "FRONTEND_URL=https://saanatuotanto.com\nNODE_ENV=production\nPORT=5008\nMONGO_URI=" > .env
fi

# Check for node_modules
if [ ! -d node_modules ]; then
    echo "📦 node_modules not found. Installing..."
    npm install
fi

# Start the server
echo "🚀 Running with PM2..."
if command -v pm2 &>/dev/null; then
    pm2 stop sto-server 2>/dev/null
    pm2 start index.js --name sto-server
else
    echo "⚠️ PM2 not found. Running with node index.js..."
    node index.js
fi
