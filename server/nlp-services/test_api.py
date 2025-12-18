"""
Script de test pour le serveur NLP Malgache unifié
"""

import requests
import json

BASE_URL = "http://localhost:5000"

def test_global_health():
    """Test le health check global"""
    print("\n" + "="*60)
    print("TEST HEALTH CHECK GLOBAL")
    print("="*60)
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
    return response.status_code == 200

def test_index():
    """Test la page d'accueil"""
    print("\n" + "="*60)
    print("TEST PAGE D'ACCUEIL")
    print("="*60)
    response = requests.get(f"{BASE_URL}/")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")

def test_analyze():
    """Test l'endpoint combiné /analyze"""
    print("\n" + "="*60)
    print("TEST ENDPOINT COMBINÉ - ANALYZE")
    print("="*60)
    
    test_cases = [
        {
            "context": "Andrianampoinimerina dia mpanjaka tany Antananarivo",
            "num_words": 10,
            "description": "Texte avec personnalité et ville"
        },
        {
            "context": "Ny tanora any Antsirabe",
            "num_words": 8,
            "description": "Texte avec ville"
        },
        {
            "context": "Ny Université d'Antananarivo",
            "num_words": 12,
            "description": "Texte avec organisation"
        }
    ]
    
    for test in test_cases:
        print(f"\n{test['description']}")
        print(f"Contexte: '{test['context']}'")
        print(f"Mots à générer: {test['num_words']}")
        
        response = requests.post(f"{BASE_URL}/analyze", json={
            "context": test['context'],
            "num_words": test['num_words']
        })
        
        if response.status_code == 200:
            data = response.json()
            
            print(f"\n✅ Autocomplétion:")
            print(f"   Complétion: {data['autocompletion']['completion']}")
            print(f"   Texte complet: {data['autocompletion']['full_text']}")
            
            print(f"\n🏷️  Entités détectées:")
            print(f"   Dans le contexte: {data['entities']['in_context']['count']} entité(s)")
            for entity in data['entities']['in_context']['entities']:
                print(f"      - {entity['text']} [{entity['type']}]")
            
            print(f"   Dans la complétion: {data['entities']['in_completion']['count']} entité(s)")
            for entity in data['entities']['in_completion']['entities']:
                print(f"      - {entity['text']} [{entity['type']}]")
            
            print(f"   Total dans le texte complet: {data['entities']['in_full_text']['count']} entité(s)")
            
            print(f"\n📊 Résumé:")
            print(f"   Mots générés: {data['summary']['total_words_generated']}")
            print(f"   Entités trouvées: {data['summary']['total_entities_found']}")
            print(f"   Types d'entités: {', '.join(data['summary']['entity_types_found']) if data['summary']['entity_types_found'] else 'Aucun'}")
            
        else:
            print(f"❌ Erreur: {response.status_code}")
            print(response.json())

# ============================================================================
# TESTS AUTOCOMPLÉTION
# ============================================================================

def test_autocompletion_health():
    """Test le health check de l'autocomplétion"""
    print("\n" + "="*60)
    print("TEST AUTOCOMPLÉTION - HEALTH")
    print("="*60)
    response = requests.get(f"{BASE_URL}/autocompletion/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")

def test_autocompletion_predict():
    """Test la prédiction du prochain mot"""
    print("\n" + "="*60)
    print("TEST AUTOCOMPLÉTION - PREDICT")
    print("="*60)
    
    test_cases = [
        {"context": "Ny fiainana dia", "num_predictions": 5},
        {"context": "Ny tanora ankehitriny", "num_predictions": 3},
        {"context": "Andriamanitra nanao", "num_predictions": 5},
    ]
    
    for test in test_cases:
        print(f"\nContexte: '{test['context']}'")
        response = requests.post(f"{BASE_URL}/autocompletion/predict", json=test)
        if response.status_code == 200:
            data = response.json()
            print(f"Prédictions:")
            for word, prob in data['predictions']:
                print(f"  - {word}: {prob:.3f}")
        else:
            print(f"Erreur: {response.status_code}")

def test_autocompletion_complete():
    """Test la complétion de phrase"""
    print("\n" + "="*60)
    print("TEST AUTOCOMPLÉTION - COMPLETE")
    print("="*60)
    
    test_cases = [
        {"context": "Ny fiainana dia", "num_words": 5},
        {"context": "Ny tanora dia tokony", "num_words": 3},
    ]
    
    for test in test_cases:
        print(f"\nContexte: '{test['context']}'")
        response = requests.post(f"{BASE_URL}/autocompletion/complete", json=test)
        if response.status_code == 200:
            data = response.json()
            print(f"Complétion: {data['completion']}")
            print(f"Texte complet: {data['full_text']}")
        else:
            print(f"Erreur: {response.status_code}")

def test_autocompletion_stats():
    """Test les statistiques de l'autocomplétion"""
    print("\n" + "="*60)
    print("TEST AUTOCOMPLÉTION - STATS")
    print("="*60)
    response = requests.get(f"{BASE_URL}/autocompletion/stats")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")

# ============================================================================
# TESTS NER
# ============================================================================

def test_ner_health():
    """Test le health check du NER"""
    print("\n" + "="*60)
    print("TEST NER - HEALTH")
    print("="*60)
    response = requests.get(f"{BASE_URL}/ner/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")

def test_ner_recognize():
    """Test la reconnaissance d'entités"""
    print("\n" + "="*60)
    print("TEST NER - RECOGNIZE")
    print("="*60)
    
    test_cases = [
        {
            "text": "Andrianampoinimerina dia mpanjaka tany Antananarivo. Nanao fahagagana tany Antsirabe izy.",
            "description": "Détection de personnalité et villes"
        },
        {
            "text": "Ny Université d'Antananarivo dia any amin'ny faritra Analamanga.",
            "description": "Détection d'organisation et région"
        },
        {
            "text": "Ranavalona I sy Radama I dia mpanjaka malaza tany Imerina.",
            "description": "Plusieurs personnalités"
        }
    ]
    
    for test in test_cases:
        print(f"\n{test['description']}")
        print(f"Texte: '{test['text']}'")
        response = requests.post(f"{BASE_URL}/ner/recognize", json={"text": test['text']})
        if response.status_code == 200:
            data = response.json()
            print(f"Entités détectées ({data['count']}):")
            for entity in data['entities']:
                print(f"  - {entity['text']} [{entity['type']}] (confiance: {entity['confidence']:.2f})")
        else:
            print(f"Erreur: {response.status_code}")

def test_ner_extract():
    """Test l'extraction par type"""
    print("\n" + "="*60)
    print("TEST NER - EXTRACT")
    print("="*60)
    
    text = "Andrianampoinimerina dia niara-niasa tamin'i Radama I tao Antananarivo sy Antsirabe."
    
    entity_types = ['PERSON', 'CITY']
    
    for entity_type in entity_types:
        print(f"\nExtraction de type: {entity_type}")
        response = requests.post(f"{BASE_URL}/ner/extract", json={
            "text": text,
            "entity_type": entity_type
        })
        if response.status_code == 200:
            data = response.json()
            print(f"Entités trouvées ({data['count']}): {', '.join(data['entities'])}")
        else:
            print(f"Erreur: {response.status_code}")

def test_ner_annotate():
    """Test l'annotation de texte"""
    print("\n" + "="*60)
    print("TEST NER - ANNOTATE")
    print("="*60)
    
    text = "Andrianampoinimerina dia mpanjaka tany Antananarivo"
    
    response = requests.post(f"{BASE_URL}/ner/annotate", json={
        "text": text,
        "format": "html"
    })
    if response.status_code == 200:
        data = response.json()
        print(f"Texte original: {data['original_text']}")
        print(f"Texte annoté (HTML):")
        print(data['annotated_text'])
    else:
        print(f"Erreur: {response.status_code}")

def test_ner_stats():
    """Test les statistiques du NER"""
    print("\n" + "="*60)
    print("TEST NER - STATS")
    print("="*60)
    response = requests.get(f"{BASE_URL}/ner/stats")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")

def test_ner_entity_types():
    """Test la liste des types d'entités"""
    print("\n" + "="*60)
    print("TEST NER - ENTITY TYPES")
    print("="*60)
    response = requests.get(f"{BASE_URL}/ner/entity_types")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")

# ============================================================================
# MAIN
# ============================================================================

def main():
    """Exécute tous les tests"""
    print("\n" + "="*60)
    print("🇲🇬 TESTS DU SERVEUR NLP MALGACHE UNIFIÉ")
    print("="*60)
    
    try:
        # Test global
        if not test_global_health():
            print("\n❌ Le serveur n'est pas accessible.")
            print("Assurez-vous qu'il est démarré avec: python app.py")
            return
        
        test_index()
        
        # Test endpoint combiné
        print("\n\n" + "🔄 TEST ENDPOINT COMBINÉ ".center(60, "="))
        test_analyze()
        
        # Tests Autocomplétion
        print("\n\n" + "🔮 TESTS AUTOCOMPLÉTION ".center(60, "="))
        test_autocompletion_health()
        test_autocompletion_predict()
        test_autocompletion_complete()
        test_autocompletion_stats()
        
        # Tests NER
        print("\n\n" + "🏷️  TESTS NER ".center(60, "="))
        test_ner_health()
        test_ner_entity_types()
        test_ner_stats()
        test_ner_recognize()
        test_ner_extract()
        test_ner_annotate()
        
        print("\n" + "="*60)
        print("✅ TOUS LES TESTS TERMINÉS AVEC SUCCÈS!")
        print("="*60 + "\n")
        
    except requests.exceptions.ConnectionError:
        print("\n❌ Impossible de se connecter au serveur.")
        print("Assurez-vous que le serveur est démarré avec: python app.py")
    except Exception as e:
        print(f"\n❌ Erreur lors des tests: {e}")

if __name__ == "__main__":
    main()

