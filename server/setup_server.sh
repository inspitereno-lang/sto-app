#!/bin/bash

echo "🚀 Starting STO Server Setup..."

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Check if python3 or python is available
if command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
elif command -v python &>/dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Error: Python not found. Please install Python to enable translations."
    exit 1
fi

echo "🐍 Using $PYTHON_CMD for Python dependencies..."

# Install Python dependencies
echo "📦 Installing Python dependencies..."
$PYTHON_CMD -m pip install -r requirements.txt

echo "✅ Setup complete!"
echo "To start the server, use: npm start"
echo "To run in background with PM2: pm2 start index.js --name sto-server"
