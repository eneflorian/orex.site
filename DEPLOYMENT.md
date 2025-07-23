# 🚀 Deployment pe orex.site

## Configurare GitHub Actions (Recomandat)

### 1. Configurare Secrets GitHub

1. Mergi la repository Settings → Secrets and variables → Actions
2. Adaugă un nou secret:
   - **Name**: `SERVER_PASSWORD`
   - **Value**: `12wq3er4`

### 2. Deployment automat

Odată configurat secret-ul, aplicația se va deploia automat pe **orex.site** când faci:

```bash
git add .
git commit -m "Update application"
git push origin main
```

## Deployment manual

### Opțiunea 1: Script automatizat

```bash
./deploy.sh
```

### Opțiunea 2: Comenzi npm

```bash
# Deploy complet
npm run deploy

# Doar upload fișiere
npm run deploy:manual

# Restart aplicația pe server
npm run server:restart
```

### Opțiunea 3: Comenzi manuale

```bash
# Build aplicația
npm run build

# Upload pe server
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.github' \
  --exclude '.next/cache' \
  ./ root@64.225.49.128:/var/www/orex-app/

# Restart pe server
ssh root@64.225.49.128 "
  cd /var/www/orex-app &&
  npm ci --only=production &&
  npm run build &&
  pm2 restart orex-app || pm2 start npm --name orex-app -- start
"
```

## Verificare deployment

### Status aplicația

```bash
npm run server:status
```

### Logs aplicația

```bash
npm run server:logs
```

### Testare aplicația

Accesează: **https://orex.site**

## Server Details

- **Host**: 64.225.49.128
- **User**: root
- **Password**: 12wq3er4
- **Path**: /var/www/orex-app
- **Process Manager**: PM2
- **Port**: 3000

## Troubleshooting

### Dacă deployment-ul eșuează:

1. Verifică că serverul este accesibil:
   ```bash
   ssh root@64.225.49.128
   ```

2. Verifică statusul PM2:
   ```bash
   npm run server:status
   ```

3. Verifică logs-urile pentru erori:
   ```bash
   npm run server:logs
   ```

4. Restart manual:
   ```bash
   npm run server:restart
   ```

### Dacă aplicația nu se încarcă:

1. Verifică că portul 3000 este deschis
2. Verifică configurația web server-ului (nginx/apache)
3. Verifică că aplicația rulează pe portul corect