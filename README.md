# OLX Scraper Pro

🔍 **Monitor inteligent pentru anunțurile OLX.ro cu interfață modernă și scraping în timp real**

Această aplicație Next.js 14 permite monitorizarea și analiza anunțurilor de pe OLX.ro cu o interfață profesională, modernă și ușor de folosit.

## ✨ Caracteristici principale

- **🎨 Interfață modernă și intuitivă** - Design complet redesignat cu UX/UI profesional
- **🔍 Scraping live OLX.ro** - Extragere anunțuri în timp real
- **⭐ Monitorizare anunțuri** - Marchează și urmărește anunțurile favorite
- **📊 Statistici avansate** - Analiză prețuri și tendințe de piață
- **🎯 Filtrare inteligentă** - Caută după oraș, categorie, preț, tip produs
- **📱 Responsive design** - Funcționează perfect pe toate dispozitivele
- **🚀 Deployment automat** - Se deploiază automat pe **orex.site**

## 🛠 Tehnologii folosite

- **Next.js 14** - Framework React cu App Router
- **TypeScript** - Type safety și dezvoltare robustă
- **Tailwind CSS** - Design modern și responsive
- **Lucide React** - Iconițe moderne și elegante
- **Cheerio & Axios** - Scraping OLX.ro
- **GitHub Actions** - CI/CD automat

## 🚀 Cum să folosești

### 1. **Caută anunțuri**
   - Mergi la tab-ul "Toate anunțurile"
   - Configurează filtrele (oraș, categorie, preț maxim)
   - Apasă "Refresh" pentru scraping live

### 2. **Monitorizează anunțuri**
   - Click pe iconița ⭐ din orice anunț
   - Vezi anunțurile monitorizate în tab-ul "Monitorizare"

### 3. **Analizează statistici**
   - Tab-ul "Statistici" oferă analize detaliate
   - Preț mediu, minim, maxim
   - Distribuții pe categorii și orașe

## 🔧 Dezvoltare locală

```bash
# Instalează dependințele
npm install

# Rulează serverul de dezvoltare
npm run dev

# Construiește aplicația
npm run build

# Rulează aplicația în mod producție
npm start

# Verifică codul
npm run lint
```

Aplicația va fi disponibilă la [http://localhost:3000](http://localhost:3000).

## 🌐 Deployment automat

### GitHub Actions
Aplicația se deploiază automat pe **orex.site** când faci push pe branch-ul `main` sau `master`.

**Configurare necesară în GitHub:**
1. Mergi la Settings → Secrets and variables → Actions
2. Adaugă secret-ul: `SERVER_PASSWORD` cu valoarea configurată

### Deployment manual

```bash
# Deployment complet cu script
npm run deploy

# Doar upload fișiere
npm run deploy:manual

# Restart aplicația pe server
npm run server:restart

# Vezi logs-urile aplicației
npm run server:logs

# Vezi statusul aplicației
npm run server:status
```

## 📊 Server de producție

- **Server**: 64.225.49.128
- **User**: root
- **Path**: /var/www/orex.site
- **Port**: 3000
- **Process Manager**: PM2

## 📁 Structura proiectului

```
├── src/
│   ├── app/              # App Router pages
│   │   ├── api/          # API endpoints
│   │   │   └── anunturi/ # Endpoint scraping OLX
│   │   ├── globals.css   # Stiluri globale
│   │   ├── layout.tsx    # Layout principal
│   │   └── page.tsx      # Homepage cu interfață nouă
│   └── lib/              # Utilități
│       └── olx-scraper.ts # Logica de scraping
├── public/               # Fișiere statice
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions workflow
├── deploy.sh             # Script deployment manual
├── ecosystem.config.js   # Configurație PM2
└── package.json          # Dependințe și scripturi
```

## 🎯 API Endpoints

### GET `/api/anunturi`
Extrage anunțuri de pe OLX.ro

**Parametri query:**
- `oras` - Orașul pentru căutare (ex: sibiu, bucuresti)
- `categorie` - Categoria anunțurilor (ex: imobiliare, auto-moto)
- `titlu` - Text de căutat în titlu
- `pretMax` - Prețul maxim
- `tip` - Tipul produsului
- `mock` - Folosește date mock pentru testare

**Răspuns:**
```json
{
  "success": true,
  "anunturi": [...],
  "total": 25,
  "statistici": {
    "pretMediu": 45000,
    "pretMin": 5000,
    "pretMax": 150000
  }
}
```

### POST `/api/anunturi`
Acțiuni pentru anunțuri (monitorizare, scraping fresh)

## 🎨 Design și UX

Interfața a fost complet redesignată cu focus pe:

- **Navigare intuitivă** - Tab-uri clare cu descrieri
- **Workflow ghidat** - Ghid pas-cu-pas pentru utilizatori noi
- **Feedback vizual** - Loading states, animații fluide
- **Cards moderne** - Design plăcut pentru anunțuri
- **Statistici vizuale** - Grafice și progress bars
- **Responsive** - Perfect pe mobile, tablet, desktop

## 🔍 Monitorizare

Pentru a monitoriza aplicația pe server:

```bash
# Vezi toate procesele PM2
npm run server:status

# Vezi logs-urile în timp real
npm run server:logs

# Restart aplicația
npm run server:restart
```

## 🤝 Contribuții

Proiectul este open source. Contribuțiile sunt binevenite!

1. Fork repository-ul
2. Creează o branch pentru feature-ul tău
3. Implementează modificările
4. Trimite un Pull Request

## 📝 Licență

MIT License - vezi fișierul LICENSE pentru detalii.

---

**🔗 Link-uri utile:**
- 🌐 Live demo: [orex.site](https://orex.site)
- 📱 OLX România: [olx.ro](https://www.olx.ro)
- 💻 GitHub: [github.com/eneflorian/olx-monitor](https://github.com/eneflorian/olx-monitor)
