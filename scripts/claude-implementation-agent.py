#!/usr/bin/env python3
"""
Claude Implementation Agent - Génère du code React basé sur un ticket
"""

import os
import json
import sys
import subprocess
from pathlib import Path
import anthropic

def get_project_structure() -> str:
    """Récupère la structure du projet pour le contexte"""
    structure = []
    
    for root, dirs, files in os.walk('src'):
        # Ignorer les dossiers spécifiques
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'dist']]
        
        level = root.replace('src', '').count(os.sep)
        indent = ' ' * 2 * level
        structure.append(f'{indent}{os.path.basename(root)}/')
        
        subindent = ' ' * 2 * (level + 1)
        for file in files[:5]:  # Limiter à 5 fichiers par dossier
            if not file.startswith('.'):
                structure.append(f'{subindent}{file}')
    
    return '\n'.join(structure[:50])  # Limiter la sortie

def implement_ticket(ticket_number: str, ticket_title: str, ticket_description: str) -> bool:
    """
    Utilise Claude pour implémenter le ticket
    Retourne True si succès, False sinon
    """
    
    # Récupérer le contexte du projet
    structure = get_project_structure()
    
    # Lire les fichiers d'exemple existants
    example_component = ""
    example_test = ""
    
    try:
        with open('src/components/Button.tsx', 'r') as f:
            example_component = f.read()
        with open('src/components/Button.test.tsx', 'r') as f:
            example_test = f.read()
    except FileNotFoundError:
        pass
    
    # Créer le prompt pour Claude
    system_prompt = """Tu es un expert React/TypeScript qui implémente des tickets de développement.

Quand tu impléments un ticket, tu DOIS:
1. Analyser le ticket et les requirements
2. Créer les composants React nécessaires avec TypeScript
3. Suivre les bonnes pratiques React (hooks, composition, etc.)
4. Ajouter JSDoc comments pour la documentation
5. Créer des tests exhaustifs avec React Testing Library
6. S'assurer que chaque composant a au minimum 80% de coverage

Pour chaque composant:
- Crée un fichier src/components/NomDuComposant.tsx
- Crée un fichier src/components/NomDuComposant.test.tsx
- Exporte le composant par défaut

Les fichiers de test DOIVENT:
- Utiliser Vitest + React Testing Library
- Couvrir tous les cas d'usage
- Tester l'accessibilité
- Tester les interactions utilisateur
- Tester les variantes/props

Format de réponse attendu:
```json
{
  "files": [
    {
      "path": "src/components/...",
      "content": "..."
    }
  ],
  "summary": "Résumé de ce qui a été implémenté"
}
```
"""
    
    user_prompt = f"""Ticket: #{ticket_number}
Titre: {ticket_title}

Description:
{ticket_description}

Structure du projet actuel:
```
{structure}
```

Exemple de composant existant (à suivre comme pattern):
{example_component}

Exemple de tests (à suivre comme pattern):
{example_test}

Implémente ce ticket en créant tous les fichiers nécessaires.
Retourne la réponse en JSON avec la structure des fichiers.
"""
    
    try:
        client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
        
        print(f"🤖 Appel Claude pour le ticket #{ticket_number}...")
        
        message = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=4000,
            system=system_prompt,
            messages=[
                {"role": "user", "content": user_prompt}
            ]
        )
        
        # Extraire la réponse
        response_text = message.content[0].text
        
        # Essayer de parser le JSON
        try:
            # Trouver le JSON dans la réponse
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            
            if json_start != -1 and json_end > json_start:
                json_str = response_text[json_start:json_end]
                data = json.loads(json_str)
                
                # Créer les fichiers
                print(f"📝 Création de {len(data['files'])} fichiers...")
                
                for file_info in data['files']:
                    file_path = file_info['path']
                    content = file_info['content']
                    
                    # Créer les dossiers parents si nécessaire
                    Path(file_path).parent.mkdir(parents=True, exist_ok=True)
                    
                    # Écrire le fichier
                    with open(file_path, 'w') as f:
                        f.write(content)
                    
                    print(f"  ✓ {file_path}")
                
                print(f"\n✅ Implémentation terminée!")
                print(f"Résumé: {data.get('summary', 'N/A')}")
                
                return True
        except json.JSONDecodeError:
            print(f"⚠️ JSON invalide dans la réponse Claude")
            print(f"Réponse reçue:\n{response_text}")
            return False
        
    except anthropic.APIError as e:
        print(f"❌ Erreur API Claude: {e}")
        return False

def git_commit_and_push(ticket_number: str) -> bool:
    """Commit et push les changements"""
    try:
        print(f"\n📤 Commit et push des changements...")
        
        # Configurer git
        subprocess.run(
            ["git", "config", "user.name", "Claude Bot"],
            check=True,
            capture_output=True
        )
        subprocess.run(
            ["git", "config", "user.email", "claude@anthropic.com"],
            check=True,
            capture_output=True
        )
        
        # Ajouter les fichiers
        subprocess.run(
            ["git", "add", "src/"],
            check=True,
            capture_output=True
        )
        
        # Vérifier s'il y a des changements
        result = subprocess.run(
            ["git", "status", "--porcelain"],
            capture_output=True,
            text=True
        )
        
        if not result.stdout.strip():
            print("⚠️ Aucun changement à committer")
            return False
        
        # Commit
        subprocess.run(
            ["git", "commit", "-m", f"feat: Implémentation ticket #{ticket_number}"],
            check=True,
            capture_output=True
        )
        
        # Push
        subprocess.run(
            ["git", "push", "origin"],
            check=True,
            capture_output=True
        )
        
        print("✅ Push terminé")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Erreur git: {e}")
        return False

def main():
    """Main function"""
    ticket_number = os.environ.get("TICKET_NUMBER", "UNKNOWN")
    ticket_title = os.environ.get("TICKET_TITLE", "")
    ticket_description = os.environ.get("TICKET_DESCRIPTION", "")
    
    print(f"""
╔════════════════════════════════════════╗
║ 🤖 Claude Implementation Agent         ║
╚════════════════════════════════════════╝

Ticket: #{ticket_number}
Titre: {ticket_title}
    """)
    
    # Étape 1: Implémenter
    if not implement_ticket(ticket_number, ticket_title, ticket_description):
        print("❌ L'implémentation a échoué")
        sys.exit(1)
    
    # Étape 2: Commit et push
    if not git_commit_and_push(ticket_number):
        print("❌ Le commit et push ont échoué")
        sys.exit(1)
    
    print("\n✅ Flux d'implémentation terminé avec succès!")

if __name__ == "__main__":
    main()
