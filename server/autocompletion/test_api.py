"""
Script de test pour l'API d'autocomplétion malgache
"""

import requests
import json

BASE_URL = "http://localhost:5001"

def test_health():
    """Test l'endpoint /health"""
    print("\n=== Test Health Check ===")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
    return response.status_code == 200

def test_predict():
    """Test l'endpoint /predict"""
    print("\n=== Test Predict ===")
    
    test_cases = [
        {"context": "Ny fiainana dia", "num_predictions": 5},
        {"context": "Ny tanora ankehitriny", "num_predictions": 3},
        {"context": "Andriamanitra nanao", "num_predictions": 5},
        {"context": "Ny fahasalamana dia", "num_predictions": 3},
    ]
    
    for test in test_cases:
        print(f"\nContexte: '{test['context']}'")
        response = requests.post(f"{BASE_URL}/predict", json=test)
        if response.status_code == 200:
            data = response.json()
            print(f"Prédictions:")
            for word, prob in data['predictions']:
                print(f"  - {word}: {prob:.3f}")
        else:
            print(f"Erreur: {response.status_code}")
            print(response.json())

def test_complete():
    """Test l'endpoint /complete"""
    print("\n=== Test Complete ===")
    
    test_cases = [
        {"context": "Ny fiainana dia", "num_words": 5},
        {"context": "Ny tanora ankehitriny dia tokony", "num_words": 3},
        {"context": "Madagasikara dia", "num_words": 4},
    ]
    
    for test in test_cases:
        print(f"\nContexte: '{test['context']}'")
        response = requests.post(f"{BASE_URL}/complete", json=test)
        if response.status_code == 200:
            data = response.json()
            print(f"Complétion: {data['completion']}")
            print(f"Texte complet: {data['full_text']}")
        else:
            print(f"Erreur: {response.status_code}")
            print(response.json())

def test_stats():
    """Test l'endpoint /stats"""
    print("\n=== Test Stats ===")
    response = requests.get(f"{BASE_URL}/stats")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")

def test_train():
    """Test l'endpoint /train"""
    print("\n=== Test Train ===")
    
    new_text = """
    Ny tanàna dia be olona. Ny olona dia mandeha miasa. 
    Ny mpianatra dia mianatra tsara. Ny mpampianatra dia mampiasa fomba mahomby.
    Ny fianarana dia mampiroborobo ny saina. Ny saina dia fitaovana mahery.
    """
    
    data = {
        "text": new_text,
        "reset": False
    }
    
    print("Entraînement du modèle avec nouveau texte...")
    response = requests.post(f"{BASE_URL}/train", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")

def main():
    """Exécute tous les tests"""
    print("=" * 50)
    print("Tests de l'API d'Autocomplétion Malgache")
    print("=" * 50)
    
    try:
        # Test 1: Health check
        if not test_health():
            print("\n❌ L'API n'est pas accessible. Assurez-vous qu'elle est démarrée.")
            return
        
        # Test 2: Stats initiales
        test_stats()
        
        # Test 3: Prédictions
        test_predict()
        
        # Test 4: Complétions
        test_complete()
        
        # Test 5: Entraînement (optionnel)
        # test_train()
        
        print("\n" + "=" * 50)
        print("✅ Tests terminés avec succès!")
        print("=" * 50)
        
    except requests.exceptions.ConnectionError:
        print("\n❌ Impossible de se connecter à l'API.")
        print("Assurez-vous que le serveur est démarré avec: python app.py")
    except Exception as e:
        print(f"\n❌ Erreur lors des tests: {e}")

if __name__ == "__main__":
    main()

