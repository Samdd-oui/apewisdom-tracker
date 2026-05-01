# ApeWisdom Tracker 🦍

Dashboard Reddit sentiment avec historisation automatique via GitHub Actions.

## Setup en 5 minutes

### 1. Créer le repo GitHub

1. Sur [github.com](https://github.com), clique **New repository**
2. Nom : `apewisdom-tracker` (ou ce que tu veux)
3. **Public** (requis pour GitHub Pages gratuit)
4. Crée le repo

### 2. Upload les fichiers

Sur la page du repo vide :
- Clique **uploading an existing file** (ou "Add file" → "Upload files")
- Glisse-dépose **tous les fichiers** en conservant la structure de dossiers :
  ```
  .github/workflows/fetch.yml
  scripts/fetch.js
  data/history.json
  index.html
  package.json
  ```
- Commit : "Initial commit"

### 3. Activer GitHub Pages

1. Settings → Pages
2. Source : **Deploy from a branch**
3. Branch : `main`, dossier : `/ (root)`
4. Save

Ton dashboard sera disponible sur :
`https://TON_USERNAME.github.io/apewisdom-tracker/`

### 4. Vérifier le premier fetch

1. Onglet **Actions** du repo
2. Tu vois "Fetch ApeWisdom Data" → clique dessus
3. **Run workflow** → Run workflow

Attends ~30 secondes. Si c'est vert ✅, tout fonctionne.

---

## Utilisation quotidienne

**Le fetch se fait automatiquement à 9h (Paris)** sans rien faire.

**Depuis ton smartphone :**
- Visite le dashboard : `https://TON_USERNAME.github.io/apewisdom-tracker/`
- Pour forcer un fetch : app GitHub → ton repo → Actions → Run workflow

---

## Changer l'heure du fetch

Dans `.github/workflows/fetch.yml`, ligne cron :
```yaml
- cron: '0 7 * * *'   # 7h UTC = 9h Paris été
```
Format : `minute heure * * *` en UTC.

---

## Données stockées

`data/history.json` contient jusqu'à 120 snapshots (~4 mois).  
Chaque snapshot = top ~300 stocks de wallstreetbets + all-stocks.
