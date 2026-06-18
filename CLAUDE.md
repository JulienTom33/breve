# CLAUDE.md — Instructions de développement

## Workflow obligatoire pour chaque ticket

### 1. Création de branche
```bash
git checkout main && git pull origin main
git checkout -b feature/<nom-du-ticket-en-kebab-case>
# Exemples :
# feature/feed-ui
# feature/rss-pipeline
# feature/auth-supabase
```

### 2. Implémentation
- Implémenter le composant / la feature selon les critères d'acceptation du ticket
- Respecter la structure de fichiers du projet
- Utiliser les tokens du design system (CSS variables, pas de valeurs hardcodées)
- Typer tous les composants et fonctions en TypeScript strict

### 3. Tests obligatoires
Pour **chaque composant React créé**, générer un fichier de test :
```
src/components/MonComposant.tsx
src/components/MonComposant.test.tsx  ← obligatoire
```

Chaque fichier de test doit couvrir :
- ✅ Rendu nominal (happy path)
- ✅ Cas vide / empty state
- ✅ Cas d'erreur
- ✅ Interactions utilisateur (click, input)
- ✅ Props obligatoires / optionnelles

Commande de test :
```bash
npm run test -- --run
```

### 4. Vérifications avant PR
```bash
npm run lint          # zéro erreur
npm run type-check    # zéro erreur
npm run test -- --run # tous les tests verts
npm run build         # build réussi
```

### 5. Ouverture de la PR
```bash
gh pr create \
  --base main \
  --title "feat: <description courte>" \
  --body "$(cat <<'EOF'
## Description
<ce que fait cette PR>

## Ticket lié
Closes #<numéro-du-ticket>

## Changements
- <changement 1>
- <changement 2>

## Tests ajoutés
- [ ] Tests unitaires composants
- [ ] Cas d'erreur couverts
- [ ] Empty states testés

## Checklist
- [ ] Lint OK
- [ ] TypeCheck OK
- [ ] Tests OK
- [ ] Build OK
- [ ] Design system respecté
EOF
)"
```

---

## Stack technique

- **Framework** : React 18 + Vite
- **Langage** : TypeScript (strict)
- **Style** : CSS Modules + variables CSS custom (design system)
- **Tests** : Vitest + @testing-library/react
- **BDD** : Supabase (PostgreSQL)
- **Auth** : Supabase Auth
- **Déploiement** : Cloudflare Pages

## Structure de fichiers

```
src/
  components/          # Composants réutilisables
    Button/
      Button.tsx
      Button.test.tsx
      Button.module.css
  features/            # Features métier
    feed/
      FeedPage.tsx
      FeedPage.test.tsx
      useFeed.ts
      useFeed.test.ts
  lib/                 # Utilitaires, clients (supabase, etc.)
  types/               # Types TypeScript globaux
  hooks/               # Hooks réutilisables
```

## Règles de code

- Un composant = un fichier = un test
- Pas de `any` en TypeScript
- Pas de valeurs CSS hardcodées (utiliser `var(--color-*)`, `var(--space-*)`)
- Nommage : PascalCase composants, camelCase fonctions, kebab-case fichiers CSS
- Commenter uniquement le "pourquoi", jamais le "quoi"

## Prompt type pour implémenter un ticket

```
Implémente le ticket #<N> — <titre>.

1. Crée la branche feature/<nom-kebab> depuis main
2. Implémente selon les critères d'acceptation du ticket
3. Génère les tests Vitest pour chaque composant (happy path, empty state, erreur, interactions)
4. Vérifie que lint, type-check, tests et build passent
5. Ouvre la PR vers main avec description complète et lien vers le ticket

Consulte CLAUDE.md pour les conventions du projet.
```
