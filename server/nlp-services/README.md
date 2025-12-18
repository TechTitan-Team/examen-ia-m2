# 🇲🇬 Services NLP Malgache - Serveur Unifié

Serveur Flask unique regroupant deux services de traitement du langage naturel en langue malgache.

## 🎯 Services disponibles

### 1. **Autocomplétion** (`/autocompletion`)
- Prédiction du prochain mot
- Génération de séquences
- Modèle N-grams (tri-grams)

### 2. **Reconnaissance d'Entités (NER)** (`/ner`)
- Détection de villes (Antsirabe, Antananarivo, etc.)
- Détection de personnalités (Andrianampoinimerina, Ranavalona I, etc.)
- Détection d'organisations, lieux, dates et événements

## 🚀 Démarrage rapide

### Installation

```bash
cd server/nlp-services
python3 -m venv path/to/venv
source path/to/venv/bin/activate
pip install -r requirements.txt
```

### Lancer le serveur

```bash
python app.py
```

Le serveur démarre sur **http://localhost:5002**

### Avec Docker

```bash
docker build -t malagasy-nlp .
docker run -p 5002:5002 malagasy-nlp
```

## 📚 Documentation des Routes

### Routes Globales

#### GET `/`
Page d'accueil avec la liste des services et endpoints disponibles

**Exemple:**
```bash
curl http://localhost:5002/
```

#### GET `/health`
Health check global de tous les services

**Exemple:**
```bash
curl http://localhost:5002/health
```

---

## 🔄 Route Combinée (Nouveau!)

### POST `/analyze`
**Endpoint combiné qui utilise l'autocomplétion ET la reconnaissance d'entités**

Complète le texte fourni (10 mots par défaut) et détecte automatiquement les entités nommées dans le contexte, la complétion et le texte complet.

**Body:**
```json
{
  "context": "Andrianampoinimerina dia mpanjaka tany Antananarivo",
  "num_words": 10,
  "entity_types": ["PERSON", "CITY"]
}
```

**Paramètres:**
- `context` (string, requis) : Le texte de départ
- `num_words` (integer, optionnel) : Nombre de mots à générer (défaut: 10)
- `entity_types` (array, optionnel) : Types d'entités à détecter

**Réponse:**
```json
{
  "input": {
    "context": "Andrianampoinimerina dia mpanjaka tany Antananarivo",
    "num_words": 10
  },
  "autocompletion": {
    "completion": "sy nanao fahagagana lehibe tamin ny vahoaka",
    "full_text": "Andrianampoinimerina dia mpanjaka tany Antananarivo sy nanao fahagagana lehibe tamin ny vahoaka"
  },
  "entities": {
    "in_context": {
      "entities": [
        {
          "entity": "Andrianampoinimerina",
          "text": "Andrianampoinimerina",
          "type": "PERSON",
          "confidence": 1.0
        },
        {
          "entity": "Antananarivo",
          "text": "Antananarivo",
          "type": "CITY",
          "confidence": 1.0
        }
      ],
      "count": 2
    },
    "in_completion": {
      "entities": [],
      "count": 0
    },
    "in_full_text": {
      "entities": [...],
      "count": 2
    }
  },
  "annotated_text": "<span>...</span>",
  "summary": {
    "total_words_generated": 8,
    "total_entities_found": 2,
    "entity_types_found": ["PERSON", "CITY"]
  }
}
```

**Exemple:**
```bash
curl -X POST http://localhost:5002/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "context": "Andrianampoinimerina dia mpanjaka tany Antananarivo",
    "num_words": 10
  }'
```

**Utilisation en Python:**
```python
import requests

response = requests.post('http://localhost:5002/analyze', json={
    'context': 'Andrianampoinimerina dia mpanjaka tany Antananarivo',
    'num_words': 10
})

data = response.json()
print(f"Texte complet: {data['autocompletion']['full_text']}")
print(f"Entités trouvées: {data['summary']['total_entities_found']}")
```

---

## 🔮 Routes Autocomplétion

**Base URL:** `/autocompletion`

### GET `/autocompletion/health`
Vérifier l'état du service d'autocomplétion

### POST `/autocompletion/predict`
Prédire le prochain mot

**Body:**
```json
{
  "context": "Ny fiainana dia",
  "num_predictions": 5
}
```

**Exemple:**
```bash
curl -X POST http://localhost:5002/autocompletion/predict \
  -H "Content-Type: application/json" \
  -d '{"context": "Ny fiainana dia", "num_predictions": 5}'
```

### POST `/autocompletion/complete`
Compléter une phrase

**Body:**
```json
{
  "context": "Ny tanora dia",
  "num_words": 5
}
```

**Exemple:**
```bash
curl -X POST http://localhost:5002/autocompletion/complete \
  -H "Content-Type: application/json" \
  -d '{"context": "Ny tanora dia", "num_words": 5}'
```

### POST `/autocompletion/train`
Entraîner le modèle avec un nouveau corpus

**Body:**
```json
{
  "text": "Votre texte malgache ici...",
  "reset": false
}
```

### GET `/autocompletion/stats`
Obtenir les statistiques du modèle

---

## 🏷️ Routes NER (Reconnaissance d'Entités)

**Base URL:** `/ner`

### GET `/ner/health`
Vérifier l'état du service NER

### POST `/ner/recognize`
Reconnaître toutes les entités dans un texte

**Body:**
```json
{
  "text": "Andrianampoinimerina dia mpanjaka tany Antananarivo",
  "entity_types": ["PERSON", "CITY"]
}
```

**Exemple:**
```bash
curl -X POST http://localhost:5002/ner/recognize \
  -H "Content-Type: application/json" \
  -d '{"text": "Andrianampoinimerina dia mpanjaka tany Antananarivo"}'
```

### POST `/ner/extract`
Extraire les entités d'un type spécifique

**Body:**
```json
{
  "text": "Nankany Antsirabe sy Fianarantsoa izy",
  "entity_type": "CITY"
}
```

**Exemple:**
```bash
curl -X POST http://localhost:5002/ner/extract \
  -H "Content-Type: application/json" \
  -d '{"text": "Nankany Antsirabe sy Fianarantsoa izy", "entity_type": "CITY"}'
```

### POST `/ner/annotate`
Annoter le texte avec les entités (HTML ou Markdown)

**Body:**
```json
{
  "text": "Andrianampoinimerina dia mpanjaka tany Antananarivo",
  "format": "html"
}
```

### POST `/ner/add_entity`
Ajouter une nouvelle entité au système

**Body:**
```json
{
  "entity": "Tsimbazaza",
  "entity_type": "LOC",
  "variations": ["Parc Tsimbazaza"],
  "metadata": {"type": "parc"}
}
```

### POST `/ner/batch_recognize`
Reconnaître les entités dans plusieurs textes

**Body:**
```json
{
  "texts": [
    "Andrianampoinimerina dia mpanjaka tany Antananarivo",
    "Ranavalona I dia mpanjaka malaza"
  ]
}
```

### GET `/ner/stats`
Obtenir les statistiques du système NER

### GET `/ner/entity_types`
Lister les types d'entités supportés

---

## 💡 Exemples d'utilisation

### Python

```python
import requests

BASE_URL = "http://localhost:5002"

# 🔄 Endpoint combiné (Recommandé) - Autocomplétion + NER
response = requests.post(f"{BASE_URL}/analyze", json={
    "context": "Andrianampoinimerina dia mpanjaka tany Antananarivo",
    "num_words": 10
})
data = response.json()

print("Texte complet:", data['autocompletion']['full_text'])
print(f"Entités trouvées: {data['summary']['total_entities_found']}")
for entity in data['entities']['in_full_text']['entities']:
    print(f"  - {entity['text']} [{entity['type']}]")

# OU utiliser les services séparément:

# Autocomplétion seule
response = requests.post(f"{BASE_URL}/autocompletion/predict", json={
    "context": "Ny fiainana dia",
    "num_predictions": 5
})
predictions = response.json()['predictions']
print("Prédictions:", predictions)

# NER seul
response = requests.post(f"{BASE_URL}/ner/recognize", json={
    "text": "Andrianampoinimerina dia mpanjaka tany Antananarivo"
})
entities = response.json()['entities']
for entity in entities:
    print(f"{entity['text']} [{entity['type']}]")
```

### JavaScript/Node.js

```javascript
const axios = require('axios');

const BASE_URL = 'http://localhost:5002';

// 🔄 Endpoint combiné (Recommandé)
const result = await axios.post(`${BASE_URL}/analyze`, {
  context: 'Andrianampoinimerina dia mpanjaka tany Antananarivo',
  num_words: 10
});

console.log('Texte complet:', result.data.autocompletion.full_text);
console.log('Entités:', result.data.summary.total_entities_found);
result.data.entities.in_full_text.entities.forEach(entity => {
  console.log(`  - ${entity.text} [${entity.type}]`);
});

// OU services séparés:

// Autocomplétion
const predictions = await axios.post(`${BASE_URL}/autocompletion/predict`, {
  context: 'Ny fiainana dia',
  num_predictions: 5
});

// NER
const entities = await axios.post(`${BASE_URL}/ner/recognize`, {
  text: 'Andrianampoinimerina dia mpanjaka tany Antananarivo'
});
```

### cURL

```bash
# Health check global
curl http://localhost:5002/health

# Endpoint combiné (Autocomplétion + NER)
curl -X POST http://localhost:5002/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "context": "Andrianampoinimerina dia mpanjaka tany Antananarivo",
    "num_words": 10
  }'

# Autocomplétion seule
curl -X POST http://localhost:5002/autocompletion/predict \
  -H "Content-Type: application/json" \
  -d '{"context": "Ny fiainana dia", "num_predictions": 5}'

# NER seul
curl -X POST http://localhost:5002/ner/recognize \
  -H "Content-Type: application/json" \
  -d '{"text": "Andrianampoinimerina dia mpanjaka tany Antananarivo"}'
```

---

## 🏗️ Structure du projet

```
nlp-services/
├── app.py                      # Serveur Flask principal
├── requirements.txt            # Dépendances Python
├── test_api.py                # Script de test
├── Dockerfile                 # Configuration Docker
├── README.md                  # Cette documentation
├── .gitignore
│
├── models/                    # Modèles Python
│   ├── ngram_model.py        # Modèle N-grams
│   └── ner_model.py          # Modèle NER
│
└── data/                      # Données
    ├── corpus/
    │   └── corpus_malagasy.txt  # Corpus d'entraînement
    └── entities/
        ├── cities.json          # Villes (20 entités)
        ├── persons.json         # Personnalités (19 entités)
        ├── organizations.json   # Organisations (20 entités)
        ├── locations.json       # Lieux (22 entités)
        └── events.json          # Événements (12 entités)
```

---

## 🧪 Tests

Exécuter les tests complets :

```bash
python test_api.py
```

Tests inclus :
- ✅ Health check global
- ✅ Page d'accueil
- ✅ Autocomplétion (predict, complete, stats)
- ✅ NER (recognize, extract, annotate, stats)

---

## 🎯 Types d'entités NER

| Type | Description | Exemples |
|------|-------------|----------|
| `PERSON` | Personnalités, noms de personnes | Andrianampoinimerina, Ranavalona I |
| `CITY` | Villes et communes | Antananarivo, Antsirabe, Toamasina |
| `ORG` | Organisations, institutions | Université d'Antananarivo, FJKM |
| `LOC` | Lieux, régions | Analamanga, Vakinankaratra, Imerina |
| `DATE` | Dates et périodes | 26 Juin, 1960 |
| `EVENT` | Événements historiques | Fête de l'Indépendance, Famadihana |

---

## ⚙️ Configuration

### Variables d'environnement

```bash
# Changer le port
PORT=8000 python app.py
```

### Personnaliser le corpus

Ajoutez vos textes malgaches dans :
- `data/corpus/corpus_malagasy.txt`

### Ajouter des entités

Éditez les fichiers JSON dans :
- `data/entities/*.json`

---

## 📊 Performance

### Serveur Unifié
- **Port unique** : 5000
- **Temps de démarrage** : ~2-3 secondes
- **Mémoire** : ~50-100 MB (les deux services)

### Autocomplétion
- Temps de réponse : < 50ms
- Vocabulaire : ~500-1000 mots

### NER
- Temps de réponse : < 100ms
- Entités : 93 entités + 47 variations

---

## 🐳 Docker

### Construire l'image

```bash
docker build -t malagasy-nlp .
```

### Lancer le conteneur

```bash
docker run -p 5000:5000 malagasy-nlp
```

### Avec volumes (pour données persistantes)

```bash
docker run -p 5000:5000 \
  -v $(pwd)/data:/app/data \
  malagasy-nlp
```

---

## 🔧 Production

Pour déployer en production :

1. **Désactiver le mode debug**
   ```python
   app.run(host='0.0.0.0', port=port, debug=False)
   ```

2. **Utiliser un serveur WSGI**
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

3. **Ajouter un reverse proxy** (Nginx, Traefik)

4. **Activer HTTPS**

5. **Implémenter le rate limiting**

---

## 📝 Avantages du serveur unifié

✅ **Un seul port** : Plus simple à déployer  
✅ **Configuration unique** : Un seul Dockerfile  
✅ **Ressources partagées** : Utilisation optimale de la mémoire  
✅ **Maintenance simplifiée** : Un seul serveur à gérer  
✅ **Routes organisées** : Préfixes clairs `/autocompletion` et `/ner`  
✅ **Health check global** : Supervision facilitée  

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :
1. Ajoutez des entités malgaches
2. Enrichissez le corpus de textes
3. Améliorez les algorithmes
4. Signalez des bugs

---

## 📄 Licence

MIT

---

**Développé pour le traitement du langage malgache 🇲🇬**

**Port unique : http://localhost:5002**

## 🎯 Exemple complet

Un script d'exemple complet est disponible : `example_analyze.py`

```bash
python example_analyze.py
```

Ce script montre comment utiliser l'endpoint `/analyze` avec différents cas d'usage.
