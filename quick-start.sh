#!/bin/bash
# Quick Start Script für NU Personality App

echo "🚀 NU Personality App - Quick Start"
echo "===================================="
echo ""

# Prüfe ob Node.js installiert ist
if ! command -v node &> /dev/null; then
    echo "❌ Node.js ist nicht installiert!"
    echo "   Bitte installiere Node.js von: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js gefunden: $(node --version)"
echo ""

# Installiere Dependencies
echo "📦 Installiere Dependencies..."
npm install

# Installiere Tailwind
echo "🎨 Installiere Tailwind CSS..."
npm install -D tailwindcss postcss autoprefixer

echo ""
echo "✅ Setup abgeschlossen!"
echo ""
echo "Verfügbare Befehle:"
echo "==================="
echo ""
echo "  npm start        - Development Server starten (localhost:3000)"
echo "  npm run build    - Production Build erstellen"
echo "  npm test         - Tests ausführen"
echo ""
echo "🌐 GitHub Deployment:"
echo "====================="
echo ""
echo "1. Git initialisieren:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo ""
echo "2. Zu GitHub pushen:"
echo "   git remote add origin https://github.com/benjooo081/nu-personality-app.git"
echo "   git push -u origin main"
echo ""
echo "3. GitHub Pages aktivieren:"
echo "   - Gehe zu Settings → Pages"
echo "   - Wähle 'GitHub Actions' als Source"
echo ""
echo "📖 Mehr Infos in SETUP_GUIDE.md"
echo ""
