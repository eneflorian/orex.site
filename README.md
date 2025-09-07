# Video Generator - Aplicație pentru generarea de video din poze

O aplicație modernă Next.js pentru crearea de video-uri din imagini cu efecte și tranziții profesionale.

## 🚀 Funcționalități

- **Upload multiple imagini** - Suportă JPG, PNG, GIF, BMP, WebP
- **Setări video personalizabile**:
  - Durată per imagine (1-10 secunde)
  - Tipuri de tranziție (fade, slide, zoom, fără)
  - Calitate video (720p, 1080p, 4K)
  - Frame rate (24, 30, 60 FPS)
- **Previzualizare video** - Player integrat cu controale
- **Descărcare directă** - Export MP4 de înaltă calitate
- **Interfață modernă** - Design responsive cu Tailwind CSS

## 🛠️ Tehnologii

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Video Processing**: FFmpeg, fluent-ffmpeg
- **File Upload**: React Dropzone
- **Icons**: Lucide React

## 📦 Instalare

```bash
# Clonează repository-ul
git clone <repository-url>
cd orex.site

# Instalează dependențele
npm install

# Rulează în modul development
npm run dev
```

## 🚀 Deployment

Aplicația este configurată pentru deployment automat pe VPS:

### Deployment automat (GitHub Actions)
```bash
git add .
git commit -m "Update aplicație"
git push origin main
```

### Deployment manual
```bash
npm run deploy
```

## 📁 Structura proiectului

```
src/
├── app/
│   ├── api/generate-video/    # API pentru generarea video
│   ├── globals.css           # Stiluri globale
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Pagina principală
├── components/
│   ├── ImageUpload.tsx       # Componentă upload imagini
│   ├── VideoSettings.tsx     # Setări video
│   └── VideoPreview.tsx      # Previzualizare video
```

## ⚙️ Configurare

### Variabile de mediu
Nu sunt necesare variabile de mediu pentru funcționarea de bază.

### Dependențe server
Pe serverul VPS trebuie instalat:
- Node.js 18+
- FFmpeg
- PM2 (pentru process management)

## 🎯 Utilizare

1. **Încarcă imagini** - Trage și lasă imagini sau click pentru a selecta
2. **Configurează setările** - Ajustează durata, tranzițiile și calitatea
3. **Generează video** - Click pe butonul "Generează Video"
4. **Previzualizează** - Urmărește video-ul generat
5. **Descarcă** - Salvează video-ul pe dispozitiv

## 🔧 Scripts disponibile

```bash
npm run dev          # Development server
npm run build        # Build pentru producție
npm run start        # Start server producție
npm run lint         # Linting
npm run deploy       # Deployment complet
npm run deploy:manual # Doar upload fișiere
npm run server:restart # Restart aplicație pe server
npm run server:logs   # Logs aplicație
npm run server:status # Status aplicație
```

## 📊 Performanță

- **Upload**: Suportă imagini până la 50MB
- **Procesare**: Optimizată pentru imagini 4K
- **Output**: Video-uri de calitate profesională
- **Compatibilitate**: Suportă toate browserele moderne

## 🐛 Troubleshooting

### Probleme comune:

1. **Eroare la generarea video-ului**
   - Verifică că FFmpeg este instalat pe server
   - Asigură-te că imaginile sunt în format suportat

2. **Upload lent**
   - Reduce dimensiunea imaginilor
   - Verifică conexiunea la internet

3. **Video de calitate scăzută**
   - Alege calitate "Înaltă" în setări
   - Folosește imagini cu rezoluție mare

## 📝 Licență

Acest proiect este dezvoltat pentru orex.site.

## 🤝 Contribuții

Pentru sugestii sau raportarea de bug-uri, contactează echipa de dezvoltare.