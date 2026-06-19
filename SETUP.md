# Setup CI/CD + Notifications Discord

## Structure des fichiers ajoutés

```
breve/
├── .github/
│   └── workflows/
│       ├── pr-checks.yml        ← Tests + lint + build sur chaque PR
│       ├── claude-review.yml    ← Review Claude après tests verts
│       └── pr-notify.yml        ← Notifications Discord lifecycle PR
├── CLAUDE.md                    ← Instructions pour Claude Code
└── SETUP.md                     ← Ce fichier
```

---

## 1. Secrets GitHub à configurer

**GitHub → Settings → Secrets and variables → Actions → New repository secret**

| Secret | Description | Où obtenir |
|--------|-------------|------------|
| `DISCORD_WEBHOOK` | URL du webhook Discord | Voir étape 2 |
| `ANTHROPIC_API_KEY` | Clé API Anthropic pour Claude | [console.anthropic.com](https://console.anthropic.com) |

---

## 2. Créer le webhook Discord

1. Ouvre ton serveur Discord
2. Crée un canal **#dev-notifs** (ou utilise un existant)
3. **Paramètres du canal** → **Intégrations** → **Webhooks** → **Nouveau webhook**
4. Nomme-le `GitHub CI` et sélectionne le canal
5. Clique **Copier l'URL du webhook**
6. Colle cette URL dans le secret `DISCORD_WEBHOOK` sur GitHub

---

## 3. Branch Protection Rules

**GitHub → Settings → Branches → Add rule → Branch name pattern : `main`**

Cocher :
- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging
  - Ajouter : `Lint & Type Check`
  - Ajouter : `Unit Tests (Vitest)`
  - Ajouter : `Build Check`
- ✅ Require branches to be up to date before merging
- ✅ Do not allow bypassing the above settings

---

## 4. Scripts requis dans package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## 5. Flux de notifications Discord

```
🚀 Nouvelle PR créée
  → ⏳ Tests en cours (GitHub Actions)
    → ❌ Tests KO  : notification erreur + lien logs
    → ✅ Tests OK  : notification succès
      → 🔍 Claude review en cours...
        → 👀 PR prête pour ta validation + lien direct
          → 🎉 Mergée  (ou 🚫 Fermée sans merge)
```
