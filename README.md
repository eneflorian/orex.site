# Orex Next.js Application

Această aplicație Next.js 14 se deploiază automat pe **orex.site** când faci commit pe GitHub.

## Tehnologii folosite

- **Node.js**: 22.11+
- **Next.js**: 14.2.30
- **TypeScript**: Pentru type safety
- **Tailwind CSS**: Pentru styling modern
- **ESLint**: Pentru code quality

## Dezvoltare locală

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

## Deployment automat

### GitHub Actions (Recomandat)
Aplicația se deploiază automat pe **orex.site** când faci push pe branch-ul `main` sau `master`.

**Configurare necesară în GitHub:**
1. Mergi la Settings → Secrets and variables → Actions
2. Adaugă secret-ul: `SERVER_PASSWORD` cu valoarea `12wq3er4`

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

## Server de producție

- **Server**: 64.225.49.128
- **User**: root
- **Path**: /var/www/orex.site
- **Port**: 3000
- **Process Manager**: PM2

## Structura proiectului

```
├── src/
│   ├── app/              # App Router pages
│   │   ├── globals.css   # Stiluri globale
│   │   ├── layout.tsx    # Layout principal
│   │   └── page.tsx      # Homepage
│   └── components/       # Componente reutilizabile
├── public/               # Fișiere statice
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions workflow
├── deploy.sh             # Script deployment manual
├── ecosystem.config.js   # Configurație PM2
└── package.json          # Dependințe și scripturi
```

## Monitorizare

Pentru a monitoriza aplicația pe server:

```bash
# Vezi toate procesele PM2
npm run server:status

# Vezi logs-urile în timp real
npm run server:logs

# Restart aplicația
npm run server:restart
```

## Dezvoltare

Poți edita pagina principală modificând `src/app/page.tsx`. Pagina se actualizează automat când salvezi fișierul.

Aplicația folosește [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) pentru optimizarea fonturilor.
