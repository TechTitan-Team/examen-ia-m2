# API d'Autocomplétion Malgache

API Flask pour l'autocomplétion et la prédiction du prochain mot en langue malgache, basée sur des modèles N-grams.

## Caractéristiques

- **Modèle N-gram** : Support pour bi-grams, tri-grams et n-grams d'ordre supérieur
- **Prédiction du prochain mot** : Suggère les mots les plus probables basés sur le contexte
- **Génération de séquences** : Complète automatiquement une phrase avec plusieurs mots
- **Stratégie de backoff** : Utilise des contextes plus courts si le contexte exact n'est pas trouvé
- **Entraînement dynamique** : Possibilité d'entraîner ou ré-entraîner le modèle via l'API

## Installation

### Prérequis

- Python 3.8+
- pip

### Installation des dépendances

```bash
cd server/autocompletion
python3 -m venv /venv  
source path/to/venv/bin/activate
pip install -r requirements.txt
```

## Utilisation

### Démarrer le serveur

```bash
python app.py
```

Le serveur démarre par défaut sur `http://localhost:5001`.

### Changer le port

```bash
PORT=8000 python app.py
```

## Endpoints API

### 1. Health Check

**GET** `/health`

Vérifie que l'API est en ligne et retourne des informations sur le modèle.

**Réponse:**
```json
{
  "status": "ok",
  "message": "API d'autocomplétion malgache opérationnelle",
  "model_info": {
    "n": 3,
    "vocabulary_size": 245,
    "trained": true
  }
}
```

### 2. Prédire le prochain mot

**POST** `/predict`

Prédit les k mots les plus probables suivant le contexte donné.

**Body:**
```json
{
  "context": "Ny fiainana dia",
  "num_predictions": 5
}
```

**Réponse:**
```json
{
  "context": "Ny fiainana dia",
  "predictions": [
    ["fanomezana", 0.4],
    ["tena", 0.3],
    ["saro-piaro", 0.2],
    ["zava-dehibe", 0.1]
  ]
}
```

### 3. Compléter une phrase

**POST** `/complete`

Génère une séquence de mots pour compléter la phrase.

**Body:**
```json
{
  "context": "Ny fiainana dia",
  "num_words": 3
}
```

**Réponse:**
```json
{
  "context": "Ny fiainana dia",
  "completion": "fanomezana avy amin'andriamanitra",
  "full_text": "Ny fiainana dia fanomezana avy amin'andriamanitra"
}
```

### 4. Entraîner le modèle

**POST** `/train`

Entraîne ou ré-entraîne le modèle avec un nouveau corpus.

**Body:**
```json
{
  "text": "Votre texte malgache ici...",
  "reset": false
}
```

**Paramètres:**
- `text`: Texte pour entraîner le modèle (requis)
- `reset`: Si `true`, réinitialise le modèle avant l'entraînement (défaut: `false`)

**Réponse:**
```json
{
  "message": "Modèle entraîné avec succès",
  "vocabulary_size": 350,
  "ngrams_count": 1205
}
```

### 5. Statistiques du modèle

**GET** `/stats`

Retourne des statistiques sur le modèle actuel.

**Réponse:**
```json
{
  "n": 3,
  "vocabulary_size": 245,
  "ngrams_count": 892,
  "total_sequences": 1543
}
```

## Architecture du Modèle

### N-grams

Le modèle utilise des n-grams pour capturer les patterns de mots dans le texte malgache:

- **Bi-grams (n=2)**: Paires de mots consécutifs
- **Tri-grams (n=3)**: Triplets de mots consécutifs (défaut)
- **N-grams supérieurs**: Séquences plus longues pour plus de contexte

### Stratégie de Backoff

Si le contexte exact n'est pas trouvé dans le modèle, une stratégie de backoff est appliquée:

1. Essaie avec le contexte complet (n-1 mots)
2. Si non trouvé, réduit le contexte à n-2 mots
3. Continue jusqu'à trouver un match ou utiliser les mots les plus fréquents

### Prétraitement

Le texte est prétraité de la manière suivante:
- Conversion en minuscules
- Tokenisation (garde les apostrophes dans les mots)
- Conservation de la ponctuation importante

## Structure du Projet

```
server/autocompletion/
├── app.py                  # API Flask
├── ngram_model.py          # Implémentation du modèle N-gram
├── requirements.txt        # Dépendances Python
├── README.md              # Documentation
└── corpus/
    └── corpus_malagasy.txt # Corpus d'entraînement
```

## Corpus d'Entraînement

Le corpus inclus contient:
- Extraits de textes religieux (Bible en malgache)
- Textes sur des thèmes variés (éducation, environnement, société)
- Vocabulaire courant malgache

### Ajouter votre propre corpus

1. Placez vos fichiers texte dans le dossier `corpus/`
2. Modifiez `app.py` pour pointer vers votre fichier
3. Ou utilisez l'endpoint `/train` pour entraîner dynamiquement

## Exemples d'Utilisation

### Avec curl

```bash
# Prédire le prochain mot
curl -X POST http://localhost:5001/predict \
  -H "Content-Type: application/json" \
  -d '{"context": "Ny fiainana dia", "num_predictions": 3}'

# Compléter une phrase
curl -X POST http://localhost:5001/complete \
  -H "Content-Type: application/json" \
  -d '{"context": "Ny tanora ankehitriny", "num_words": 5}'
```

### Avec Python (requests)

```python
import requests

url = "http://localhost:5001/predict"
data = {
    "context": "Ny fiainana dia",
    "num_predictions": 5
}

response = requests.post(url, json=data)
print(response.json())
```

### Avec JavaScript (fetch)

```javascript
fetch('http://localhost:5001/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    context: 'Ny fiainana dia',
    num_predictions: 5
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Performance et Optimisation

- Le modèle est chargé en mémoire au démarrage pour des réponses rapides
- Les probabilités sont calculées à la volée
- La complexité de recherche est O(1) pour les contextes exacts
- Le backoff ajoute une complexité additionnelle mais garantit toujours une réponse

## Améliorations Futures

- [ ] Support pour les modèles de Markov d'ordre supérieur
- [ ] Lissage de Laplace pour les n-grams non vus
- [ ] Sauvegarde/chargement de modèles pré-entraînés
- [ ] API pour évaluer la perplexité du modèle
- [ ] Support pour plusieurs langues simultanément
- [ ] Cache des prédictions fréquentes

## Licence

MIT

## Contribution

Les contributions sont les bienvenues! N'hésitez pas à ouvrir une issue ou un pull request.

