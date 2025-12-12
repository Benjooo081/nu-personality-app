# ✅ GitHub Deployment Checklist

## Vor dem Start
- [ ] Node.js installiert (v16+)
- [ ] Git installiert
- [ ] GitHub Account erstellt
- [ ] Alle Dateien heruntergeladen

## GitHub Setup
- [ ] Neues Repository erstellt: `nu-personality-app`
- [ ] Repository ist **Public**
- [ ] Kein README beim Erstellen hinzugefügt

## Lokales Setup
```bash
cd nu-personality-app
npm install
npm install -D tailwindcss postcss autoprefixer
npm start  # Testen auf localhost:3000
```

## Git Befehle
```bash
git init
git add .
git commit -m "Initial commit - NU Personality App"
git branch -M main
git remote add origin https://github.com/benjooo081/nu-personality-app.git
git push -u origin main
```

**WICHTIG**: Ersetze `benjooo081` mit deinem GitHub Username!

## GitHub Pages aktivieren
- [ ] Gehe zu Repository → Settings → Pages
- [ ] Source: "GitHub Actions" auswählen
- [ ] Warte 2-3 Minuten auf Deployment
- [ ] Prüfe Actions Tab für Status

## Finale URL
```
https://benjooo081.github.io/nu-personality-app
```

## Auf dem Handy testen
- [ ] URL auf Smartphone öffnen
- [ ] Slider testen (sollten vibrieren!)
- [ ] Alle Kategorien durchgehen
- [ ] Visualisierung erstellen
- [ ] Zum Home-Screen hinzufügen

## Optional: Custom Domain
1. Domain kaufen (z.B. bei Namecheap, Google Domains)
2. DNS Einträge hinzufügen:
   ```
   A Record: 185.199.108.153
   A Record: 185.199.109.153
   A Record: 185.199.110.153
   A Record: 185.199.111.153
   ```
3. In Repository Settings → Pages → Custom Domain eintragen

## Fertig! 🎉

Deine App ist jetzt live und kann geteilt werden!

**Nächste Schritte:**
- Mit Freunden teilen
- Feedback sammeln
- Design anpassen
- Star auf GitHub geben ⭐
