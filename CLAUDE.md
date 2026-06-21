# CLAUDE.md — Instructions de développement

Ces instructions s’appliquent à Claude Code dans ce projet.  
Tu dois toujours suivre le workflow décrit ici, sauf indication contraire explicite.

---

## 0. Rappels importants

- Ne jamais travailler directement sur `main`.
- Toujours :
  - Créer une branche dédiée.
  - Lancer lint, type-check, tests et build avant d’ouvrir ou mettre à jour une PR.
- Utiliser `gh` (GitHub CLI) pour interagir avec les issues et PR (création de branche, PR, checkout de PR, etc.).

### 0.1 Statut des issues (labels)

Les issues du backlog utilisent des labels de statut :

- `status: backlog`
- `status: in-progress`
- `status: in-review`
- (optionnel plus tard : `status: done`)

Règles :

- Quand tu commences à travailler sur un ticket → passer l’issue en `status: in-progress`.
- Quand tu crées la PR → passer l’issue en `status: in-review`.

---

## 1. Workflow à partir d’un ticket GitHub (issue)

Quand je te donne **une URL ou un numéro de ticket GitHub** (par ex. `https://github.com/JulienTom33/breve/issues/42` ou `ticket #42`), tu dois suivre ce workflow :

### 1.1 Récupération du ticket

1. Utiliser `gh issue view` pour récupérer les infos :

   ```bash
   gh issue view <url-ou-numero> --json number,title,htmlUrl
   ```

2. En déduire :
   - `issueNumber` = `number`
   - `issueTitle` = `title`

### 1.2 Nom de branche à partir du ticket

1. À partir du `issueTitle`, générer un **slug kebab-case** :
   - minuscules
   - espaces → `-`
   - enlever accents et caractères spéciaux.
2. Nom final de la branche :

   ```text
   feature/<issueNumber>-<slug>
   ```

   Exemples :

   - Issue #7 "Update Button component documentation and formatting"  
     → `feature/7-update-button-component-documentation-and-formatting`
   - Issue #42 "Add RSS feed UI"  
     → `feature/42-add-rss-feed-ui`

### 1.3 Création de branche depuis `main`

Avant toute modif :

```bash
git status          # vérifier qu’il n’y a pas de changements non commités
git switch main
git pull origin main
git switch -c feature/<issueNumber>-<slug>
```

Si la branche existe déjà :

```bash
git switch feature/<issueNumber>-<slug>
git pull --rebase origin feature/<issueNumber>-<slug> || git pull origin feature/<issueNumber>-<slug>
```

### 1.4 Mettre l’issue en "In Progress"

Dès que tu commences à travailler sur le ticket :

1. Mettre à jour les labels de l’issue :

   ```bash
   gh issue edit <issueNumber> \
     --add-label "status: in-progress" \
     --remove-label "status: backlog"
   ```

2. Ajouter un commentaire sur l’issue pour tracer le début du travail :

   ```bash
   gh issue comment <issueNumber> \
     --body "🧑‍💻 Début de l’implémentation (branche \`feature/<issueNumber>-<slug>\`)."
   ```

---

## 2. Implémentation

Pour chaque ticket :

- Implémenter le composant / la feature selon les critères d’acceptation du ticket (lire le contenu de l’issue).
- Respecter la structure de fichiers du projet (voir plus bas).
- Utiliser les tokens du design system (variables CSS, **jamais** de valeurs hardcodées).
- Typer tous les composants et fonctions en TypeScript strict (aucun `any`).

---

## 3. Tests obligatoires

Pour **chaque composant React créé**, générer un fichier de test :

```text
src/components/MonComposant.tsx
src/components/MonComposant.test.tsx  ← obligatoire
```

Chaque fichier de test doit couvrir :

- ✅ Rendu nominal (happy path)
- ✅ Cas vide / empty state
- ✅ Cas d’erreur
- ✅ Interactions utilisateur (click, input)
- ✅ Props obligatoires / optionnelles

Commande de test :

```bash
npm run test -- --run
```

Les tests doivent tous être verts avant PR.

---

## 4. Vérifications avant PR

Avant d’ouvrir ou de mettre à jour une PR, exécuter **dans cet ordre** :

```bash
npm run lint           # zéro erreur
npm run type-check     # zéro erreur (ou équivalent si script existe)
npm run test -- --run  # tous les tests verts
npm run build          # build réussi
```

Si une commande échoue, corriger le code avant de continuer.

---

## 5. Ouverture de la PR (automatique avec gh)

Une fois le dev terminé sur `feature/<issueNumber>-<slug>` :

1. Vérifier l’état Git :

   ```bash
   git status
   ```

2. Commit :

   ```bash
   git add .
   git commit -m "feat(#<issueNumber>): <description courte>"
   git push -u origin feature/<issueNumber>-<slug>
   ```

3. Créer la PR avec `gh` en remplissant automatiquement titre + body, puis en ajoutant le lien vers le ticket :

   ```bash
   gh pr create \
     --base main \
     --head feature/<issueNumber>-<slug> \
     --title "feat: <description courte>" \
     --body "$(cat <<'EOF'
   ```

## Description

<ce que fait cette PR>

## Ticket lié

Closes #<issueNumber>

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

  ```

4. Mettre l’issue en "In Review" après création de la PR :

   1. Mettre à jour les labels :

      ```bash
      gh issue edit <issueNumber> \
        --add-label "status: in-review" \
        --remove-label "status: in-progress"
      ```

   2. Ajouter un commentaire sur l’issue avec le lien vers la PR :

      ```bash
      gh issue comment <issueNumber> \
        --body "👀 PR créée pour revue : <URL_DE_LA_PR>."
      ```

5. À la fin, afficher l’URL de la PR dans ta réponse.

---

## 6. Workflow de correction : « Corrige la PR #<numéro> »

Quand je dis :

> Corrige la PR #<numéro>

Tu dois :

1. Récupérer les infos de la PR :

   ```bash
   gh pr view <numero> --json number,headRefName,baseRefName,htmlUrl,title,body
   ```

2. Basculer sur la branche de la PR :

   ```bash
   gh pr checkout <numero>
   ```

3. Lire :
   - La description de la PR.
   - Les commentaires de review (GitHub) si possible.
   - Les erreurs de CI (logs GitHub Actions) si mentionnées.

4. Appliquer les corrections demandées :
   - Modifier le code concerné.
   - Mettre à jour/ajouter des tests.
   - Ré-exécuter :

     ```bash
     npm run lint
     npm run test -- --run
     npm run build
     ```

5. Commit + push des corrections :

   ```bash
   git add .
   git commit -m "fix: address review comments for PR #<numero>"
   git push
   ```

6. Résumer dans ta réponse :
   - Ce qui a été corrigé.
   - Quels tests ont été ajoutés/ajustés.
   - Si besoin, proposer un message de commentaire à poster dans la PR.

Chaque push sur la branche existante mettra à jour la PR et déclenchera la CI et les notifications.

---

## 7. Stack technique

- **Framework** : React 19 + Vite
- **Langage** : TypeScript (strict)
- **Style** : CSS Modules + variables CSS custom (design system)
- **Tests** : Vitest + @testing-library/react
- **BDD** : Supabase (PostgreSQL)
- **Auth** : Supabase Auth
- **Déploiement** : Cloudflare Pages

---

## 8. Structure de fichiers

```text
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

---

## 9. Règles de code

- Un composant = un fichier = un test.
- Pas de `any` en TypeScript.
- Pas de valeurs CSS hardcodées (utiliser `var(--color-*)`, `var(--space-*)`, etc.).
- Nommage :
  - PascalCase pour les composants.
  - camelCase pour les fonctions/variables.
  - kebab-case pour les fichiers CSS.
- Commenter uniquement le _pourquoi_, jamais le _quoi_.

---

## 10. Prompts types que je peux utiliser dans Warp

### 10.1 Implémenter un ticket

> Implémente le ticket https://github.com/JulienTom33/breve/issues/42 en suivant CLAUDE.md :  
> – crée la branche depuis main `feature/<numero>-<slug>`  
> – met l’issue en `status: in-progress`  
> – implémente la feature  
> – ajoute les tests  
> – lance lint, tests, build  
> – commit/push  
> – crée la PR vers main en liant le ticket  
> – met l’issue en `status: in-review`.

### 10.2 Corriger une PR

> Corrige la PR #95 en suivant CLAUDE.md :  
> – checkout de la branche de la PR  
> – lis mes commentaires  
> – applique les corrections  
> – mets les tests à jour  
> – relance lint/tests/build  
> – commit/push sur la même branche.

Claude doit s’appuyer sur ce fichier pour toutes ses actions dans ce repo.
