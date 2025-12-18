"""
Exemple d'utilisation de l'endpoint /analyze
Combine autocomplétion et reconnaissance d'entités
"""

import requests
import json

BASE_URL = "http://localhost:5002"

def example_analyze():
    """Exemple complet d'utilisation de /analyze"""
    
    print("="*70)
    print("EXEMPLE D'UTILISATION DE L'ENDPOINT /analyze")
    print("="*70)
    
    # Cas d'usage 1 : Texte avec personnalité et ville
    print("\n📝 Cas 1 : Texte historique")
    print("-"*70)
    
    response = requests.post(f"{BASE_URL}/analyze", json={
        "context": "Andrianampoinimerina dia mpanjaka tany Antananarivo",
        "num_words": 10
    })
    
    if response.status_code == 200:
        data = response.json()
        
        print(f"\n📥 ENTRÉE:")
        print(f"   Contexte: {data['input']['context']}")
        print(f"   Mots à générer: {data['input']['num_words']}")
        
        print(f"\n🔮 AUTOCOMPLÉTION:")
        print(f"   Complétion: {data['autocompletion']['completion']}")
        print(f"   ➡️  Texte complet: {data['autocompletion']['full_text']}")
        
        print(f"\n🏷️  RECONNAISSANCE D'ENTITÉS:")
        
        print(f"\n   📍 Dans le contexte original ({data['entities']['in_context']['count']} entité(s)):")
        for entity in data['entities']['in_context']['entities']:
            print(f"      • {entity['text']:20} [{entity['type']:8}] confiance: {entity['confidence']:.2f}")
            if entity.get('metadata'):
                for key, value in entity['metadata'].items():
                    print(f"        └─ {key}: {value}")
        
        print(f"\n   ✨ Dans la complétion ({data['entities']['in_completion']['count']} entité(s)):")
        for entity in data['entities']['in_completion']['entities']:
            print(f"      • {entity['text']:20} [{entity['type']:8}] confiance: {entity['confidence']:.2f}")
        
        print(f"\n   📊 Total dans le texte complet ({data['entities']['in_full_text']['count']} entité(s)):")
        for entity in data['entities']['in_full_text']['entities']:
            print(f"      • {entity['text']:20} [{entity['type']:8}]")
        
        print(f"\n📈 RÉSUMÉ:")
        print(f"   • Mots générés: {data['summary']['total_words_generated']}")
        print(f"   • Entités trouvées: {data['summary']['total_entities_found']}")
        print(f"   • Types d'entités: {', '.join(data['summary']['entity_types_found']) if data['summary']['entity_types_found'] else 'Aucun'}")
        
        print(f"\n🎨 TEXTE ANNOTÉ (HTML):")
        print(f"   {data['annotated_text'][:200]}...")
    
    # Cas d'usage 2 : Texte sur l'éducation
    print("\n\n📝 Cas 2 : Texte sur l'éducation")
    print("-"*70)
    
    response = requests.post(f"{BASE_URL}/analyze", json={
        "context": "Ny Université d'Antananarivo",
        "num_words": 12
    })
    
    if response.status_code == 200:
        data = response.json()
        
        print(f"\n📥 Contexte: {data['input']['context']}")
        print(f"🔮 Texte complet: {data['autocompletion']['full_text']}")
        print(f"🏷️  Entités: {data['summary']['total_entities_found']} trouvée(s)")
        for entity in data['entities']['in_full_text']['entities']:
            print(f"   • {entity['text']} [{entity['type']}]")
    
    # Cas d'usage 3 : Texte simple
    print("\n\n📝 Cas 3 : Texte général")
    print("-"*70)
    
    response = requests.post(f"{BASE_URL}/analyze", json={
        "context": "Ny tanora any Antsirabe",
        "num_words": 8
    })
    
    if response.status_code == 200:
        data = response.json()
        
        print(f"\n📥 Contexte: {data['input']['context']}")
        print(f"🔮 Texte complet: {data['autocompletion']['full_text']}")
        print(f"🏷️  Entités: {data['summary']['total_entities_found']} trouvée(s)")
        for entity in data['entities']['in_full_text']['entities']:
            print(f"   • {entity['text']} [{entity['type']}]")
    
    print("\n" + "="*70)
    print("✅ Exemples terminés!")
    print("="*70)

def example_with_filters():
    """Exemple avec filtrage des types d'entités"""
    
    print("\n\n" + "="*70)
    print("EXEMPLE AVEC FILTRAGE DES TYPES D'ENTITÉS")
    print("="*70)
    
    response = requests.post(f"{BASE_URL}/analyze", json={
        "context": "Andrianampoinimerina sy Radama I tany Antananarivo sy Antsirabe",
        "num_words": 10,
        "entity_types": ["PERSON", "CITY"]  # Seulement les personnes et villes
    })
    
    if response.status_code == 200:
        data = response.json()
        
        print(f"\n📥 Contexte: {data['input']['context']}")
        print(f"🔮 Texte complet: {data['autocompletion']['full_text']}")
        print(f"\n🏷️  Entités détectées (PERSON et CITY uniquement):")
        
        for entity in data['entities']['in_full_text']['entities']:
            emoji = "👑" if entity['type'] == "PERSON" else "🏙️"
            print(f"   {emoji} {entity['text']} [{entity['type']}]")

if __name__ == "__main__":
    try:
        example_analyze()
        example_with_filters()
        
    except requests.exceptions.ConnectionError:
        print("\n❌ Impossible de se connecter au serveur.")
        print("Assurez-vous que le serveur est démarré avec: python app.py")
    except Exception as e:
        print(f"\n❌ Erreur: {e}")

