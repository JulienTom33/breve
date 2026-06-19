#!/usr/bin/env python3
"""
Claude Review Agent - Relit et améliore le code des PR
"""

import os
import json
import sys
import subprocess
from pathlib import Path
import anthropic

def get_pr_files() -> list[str]:
    """Récupère la liste des fichiers modifiés dans la branche actuelle"""
    try:
        result = subprocess.run(
            ["git", "diff", "--name-only", "main...HEAD"],
            capture_output=True,
            text=True,
            check=True
        )
        files = result.stdout.strip().split('\n')
        return [f for f in files if f.startswith('src/') and not f.startswith('src/test/')]
    except subprocess.CalledProcessError:
        return []

def read_file_content(file_path: str) -> str | None:
    """Lit le contenu d'un fichier"""
    try:
        with open(file_path, 'r') as f:
            return f.read()
    except FileNotFoundError:
        return None

def analyze_code_with_claude(files_content: dict) -> dict:
    """
    Utilise Claude pour analyser le code et proposer des améliorations
    """
    
    system_prompt = """Tu es un expert en revue de code React/TypeScript. 
Ton rôle est de:
1. Analyser la qualité du code
2. Vérifier les bonnes pratiques React et TypeScript
3. Identifier les problèmes de performance
4. Vérifier la couverture des tests
5. Proposer des améliorations spécifiques avec du code

Fournis une réponse JSON avec:
{
  "issues": [
    {
      "file": "chemin du fichier",
      "severity": "critical|warning|info",
      "message": "Description du problème",
      "suggestion": "Comment corriger"
    }
  ],
  "improvements": [
    {
      "file": "chemin du fichier",
      "changes": [
        {
          "type": "replace|add|remove",
          "before": "code original (optionnel)",
          "after": "code amélioré",
          "reason": "Pourquoi cette change"
        }
      ]
    }
  ],
  "summary": "Résumé général de la review"
}"""
    
    # Préparer le contenu des fichiers
    files_summary = ""
    for file_path, content in files_content.items():
        files_summary += f"\n\n### {file_path}\n```\n{content[:2000]}\n```"
    
    user_prompt = f"""Relis le code suivant et fournis tes recommandations:

{files_summary}

Vérifie:
- Type safety (TypeScript)
- React best practices
- Accessibilité
- Tests coverage
- Performance
- Code clarity

Retourne la réponse en JSON."""
    
    try:
        client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
        
        print("🤖 Claude Review Agent en action...")
        
        message = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=3000,
            system=system_prompt,
            messages=[
                {"role": "user", "content": user_prompt}
            ]
        )
        
        response_text = message.content[0].text
        
        # Parser le JSON
        try:
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            
            if json_start != -1 and json_end > json_start:
                json_str = response_text[json_start:json_end]
                data = json.loads(json_str)
                return data
        except json.JSONDecodeError:
            print(f"⚠️ JSON invalide: {response_text[:500]}")
            return {"issues": [], "improvements": [], "summary": "Erreur de parsing"}
        
    except anthropic.APIError as e:
        print(f"❌ Erreur API Claude: {e}")
        return {"issues": [], "improvements": [], "summary": "Erreur API"}

def apply_improvements(improvements: list) -> bool:
    """Applique les améliorations proposées aux fichiers"""
    try:
        for improvement in improvements:
            file_path = improvement['file']
            
            if not os.path.exists(file_path):
                print(f"⚠️ Fichier non trouvé: {file_path}")
                continue
            
            with open(file_path, 'r') as f:
                content = f.read()
            
            # Appliquer les changements
            for change in improvement.get('changes', []):
                if change['type'] == 'replace':
                    if 'before' in change and 'after' in change:
                        content = content.replace(change['before'], change['after'], 1)
                        print(f"✓ {file_path}: Replacement appliqué")
                
                elif change['type'] == 'add':
                    content += f"\n\n{change['after']}"
                    print(f"✓ {file_path}: Code ajouté")
            
            # Écrire le fichier modifié
            with open(file_path, 'w') as f:
                f.write(content)
        
        return True
    except Exception as e:
        print(f"❌ Erreur lors de l'application des changements: {e}")
        return False

def commit_review_changes(ticket_number: str) -> bool:
    """Commit les améliorations apportées"""
    try:
        print("\n📤 Commit des améliorations...")
        
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
        
        # Ajouter les fichiers modifiés
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
        
        if result.stdout.strip():
            # Commit
            subprocess.run(
                ["git", "commit", "-m", f"refactor: Améliorations suite à la review IA - #{ticket_number}"],
                check=True,
                capture_output=True
            )
            
            # Push
            subprocess.run(
                ["git", "push", "origin"],
                check=True,
                capture_output=True
            )
            
            print("✅ Commit et push terminés")
            return True
        else:
            print("ℹ️ Aucune modification apportée")
            return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Erreur git: {e}")
        return False

def main():
    """Main function"""
    ticket_number = os.environ.get("TICKET_NUMBER", "UNKNOWN")
    
    print(f"""
╔════════════════════════════════════════╗
║ 🔍 Claude Review Agent                 ║
╚════════════════════════════════════════╝

Ticket: #{ticket_number}
    """)
    
    # Étape 1: Récupérer les fichiers modifiés
    print("📂 Récupération des fichiers modifiés...")
    files = get_pr_files()
    
    if not files:
        print("⚠️ Aucun fichier à reviewer")
        sys.exit(0)
    
    print(f"Fichiers trouvés: {len(files)}")
    for f in files:
        print(f"  - {f}")
    
    # Étape 2: Lire le contenu des fichiers
    print("\n📖 Lecture des fichiers...")
    files_content = {}
    for file_path in files:
        content = read_file_content(file_path)
        if content:
            files_content[file_path] = content
            print(f"  ✓ {file_path}")
    
    if not files_content:
        print("❌ Impossible de lire les fichiers")
        sys.exit(1)
    
    # Étape 3: Analyser le code
    print("\n🤖 Analyse du code par Claude...")
    review_result = analyze_code_with_claude(files_content)
    
    # Afficher les issues
    issues = review_result.get('issues', [])
    if issues:
        print(f"\n⚠️ Issues détectées ({len(issues)}):")
        for issue in issues:
            severity_emoji = {
                'critical': '🔴',
                'warning': '🟡',
                'info': '🔵'
            }.get(issue.get('severity'), '⚪')
            
            print(f"\n{severity_emoji} {issue['file']}")
            print(f"   Message: {issue['message']}")
            print(f"   Solution: {issue['suggestion']}")
    else:
        print("\n✅ Aucune issue critique détectée")
    
    # Étape 4: Appliquer les améliorations
    improvements = review_result.get('improvements', [])
    if improvements:
        print(f"\n🔧 Application de {len(improvements)} améliorations...")
        if not apply_improvements(improvements):
            print("❌ Erreur lors de l'application des améliorations")
            sys.exit(1)
    else:
        print("ℹ️ Aucune amélioration proposée")
    
    # Étape 5: Commit et push
    if improvements and not commit_review_changes(ticket_number):
        print("❌ Erreur lors du commit")
        sys.exit(1)
    
    # Afficher le résumé
    print(f"\n📊 Résumé:\n{review_result.get('summary', 'N/A')}")
    print("\n✅ Review terminée!")

if __name__ == "__main__":
    main()
