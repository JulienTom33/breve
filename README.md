# 📰 Scope News

App de news agrégée, synthétisée et filtrée — RSS + IA + Supabase.

## Stack

- **React 19** + **Vite 6** + **TypeScript 5**
- **TailwindCSS v4**
- **Supabase** (BDD + Auth)
- **ESLint** + **Prettier** + **Husky**

## Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Copier les variables d'environnement
cp .env.example .env.local
# Remplir les valeurs dans .env.local

# 3. Lancer le serveur de dev
npm run dev
```

## Scripts

| Commande           | Description                 |
| ------------------ | --------------------------- |
| `npm run dev`      | Serveur de développement    |
| `npm run build`    | Build de production         |
| `npm run preview`  | Prévisualiser le build      |
| `npm run lint`     | Linter ESLint               |
| `npm run lint:fix` | Corriger les erreurs ESLint |
| `npm run format`   | Formater avec Prettier      |

## Structure

```
src/
├── components/   # Composants réutilisables
├── pages/        # Pages (routes)
├── hooks/        # Custom React hooks
├── lib/          # Clients externes (supabase, api…)
└── types/        # Types TypeScript partagés
```

## Variables d'environnement

Voir [`.env.example`](.env.example) pour la liste complète.
