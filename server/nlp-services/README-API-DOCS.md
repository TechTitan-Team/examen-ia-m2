# 📚 Documentation API - Services NLP Malgache (Serveur Unifié)

Documentation complète de l'API unifiée de traitement du langage naturel en malgache.

---

## 🌐 Informations générales

**Base URL:** `http://localhost:5000`  
**Port par défaut:** 5000  
**Format:** JSON  
**CORS:** Activé

---

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Routes globales](#routes-globales)
3. [Service Autocomplétion](#service-autocomplétion)
4. [Service NER](#service-ner)
5. [Exemples d'utilisation](#exemples-dutilisation)
6. [Codes d'erreur](#codes-derreur)

---

## 🎯 Vue d'ensemble

Le serveur unifié expose **deux services** sur des routes distinctes :

### **Service Autocomplétion** (`/autocompletion`)
- Prédiction du prochain mot
- Génération de séquences
- Basé sur des modèles N-grams

### **Service NER** (`/ner`)
- Détection de villes, personnalités, organisations
- Annotation de texte
- 93 entités malgaches pré-chargées

---

## 🌍 Routes globales

### GET `/`
Page d'accueil avec la liste des services disponibles

**Réponse:**
```json
{
  "message": "Services NLP Malgache",
  "version": "1.0.0",
  "services": {
    "autocompletion": {
      "base_url": "/autocompletion",
      "endpoints": [...]
    },
    "ner": {
      "base_url": "/ner",
      "endpoints": [...]
    }
  }
}
```

**Exemple:**
```bash
curl http://localhost:5000/
```

---

### GET `/health`
Health check global de tous les services

**Réponse:**
```json
{
  "status": "ok",
  "message": "Services NLP Malgache opérationnels",
  "services": {
    "autocompletion": {
      "status": "ok",
      "vocabulary_size": 245,
      "trained": true
    },
    "ner": {
      "status": "ok",
      "entities_loaded": 93
    }
  }
}
```

**Exemple:**
```bash
curl http://localhost:5000/health
```

---

## 🔮 Service Autocomplétion

**Base URL:** `/autocompletion`

### 1. Health Check

**GET** `/autocompletion/health`

Vérifie l'état du service d'autocomplétion.

**Réponse:**
```json
{
  "status": "ok",
  "service": "autocompletion",
  "message": "Service d'autocomplétion malgache opérationnel",
  "model_info": {
    "n": 3,
    "vocabulary_size": 245,
    "trained": true
  }
}
```

**Exemple:**
```bash
curl http://localhost:5000/autocompletion/health
```

---

### 2. Prédire le prochain mot

**POST** `/autocompletion/predict`

Prédit les k mots les plus probables suivant le contexte.

**Body:**
```json
{
  "context": "Ny fiainana dia",
  "num_predictions": 5
}
```

**Paramètres:**
- `context` (string, requis) : Le texte de contexte
- `num_predictions` (integer, optionnel) : Nombre de prédictions (défaut: 5)

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

**Exemples:**

```bash
# cURL
curl -X POST http://localhost:5000/autocompletion/predict \
  -H "Content-Type: application/json" \
  -d '{"context": "Ny fiainana dia", "num_predictions": 5}'
```

```python
# Python
import requests

response = requests.post('http://localhost:5000/autocompletion/predict', json={
    'context': 'Ny fiainana dia',
    'num_predictions': 5
})
print(response.json())
```

```javascript
// JavaScript
fetch('http://localhost:5000/autocompletion/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    context: 'Ny fiainana dia',
    num_predictions: 5
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

### 3. Compléter une phrase

**POST** `/autocompletion/complete`

Génère une séquence de mots pour compléter la phrase.

**Body:**
```json
{
  "context": "Ny tanora dia",
  "num_words": 5
}
```

**Paramètres:**
- `context` (string, requis) : Le texte de contexte
- `num_words` (integer, optionnel) : Nombre de mots à générer (défaut: 3)

**Réponse:**
```json
{
  "context": "Ny tanora dia",
  "completion": "tokony hanaja ny ray aman-dreny",
  "full_text": "Ny tanora dia tokony hanaja ny ray aman-dreny"
}
```

**Exemple:**
```bash
curl -X POST http://localhost:5000/autocompletion/complete \
  -H "Content-Type: application/json" \
  -d '{"context": "Ny tanora dia", "num_words": 5}'
```

---

### 4. Entraîner le modèle

**POST** `/autocompletion/train`

Entraîne ou ré-entraîne le modèle avec un nouveau corpus.

**Body:**
```json
{
  "text": "Votre texte malgache ici...",
  "reset": false
}
```

**Paramètres:**
- `text` (string, requis) : Texte pour entraîner le modèle
- `reset` (boolean, optionnel) : Réinitialiser avant l'entraînement (défaut: false)

**Réponse:**
```json
{
  "message": "Modèle entraîné avec succès",
  "vocabulary_size": 350,
  "ngrams_count": 1205
}
```

---

### 5. Statistiques

**GET** `/autocompletion/stats`

Retourne les statistiques du modèle d'autocomplétion.

**Réponse:**
```json
{
  "n": 3,
  "vocabulary_size": 245,
  "ngrams_count": 892,
  "total_sequences": 1543
}
```

**Exemple:**
```bash
curl http://localhost:5000/autocompletion/stats
```

---

## 🏷️ Service NER (Reconnaissance d'Entités)

**Base URL:** `/ner`

### Types d'entités supportés

| Type | Description | Exemples |
|------|-------------|----------|
| `PERSON` | Personnalités | Andrianampoinimerina, Ranavalona I |
| `CITY` | Villes | Antananarivo, Antsirabe, Toamasina |
| `ORG` | Organisations | Université d'Antananarivo, FJKM |
| `LOC` | Lieux, régions | Analamanga, Vakinankaratra |
| `DATE` | Dates | 26 Juin, 1960 |
| `EVENT` | Événements | Fête de l'Indépendance |

---

### 1. Health Check

**GET** `/ner/health`

Vérifie l'état du service NER.

**Réponse:**
```json
{
  "status": "ok",
  "service": "ner",
  "message": "Service de reconnaissance d'entités malgache opérationnel",
  "entities_loaded": {
    "entity_types": {
      "PERSON": 19,
      "CITY": 20,
      "ORG": 20,
      "LOC": 22,
      "EVENT": 12
    },
    "total_entities": 93
  }
}
```

**Exemple:**
```bash
curl http://localhost:5000/ner/health
```

---

### 2. Reconnaître les entités

**POST** `/ner/recognize`

Reconnaît toutes les entités nommées dans un texte.

**Body:**
```json
{
  "text": "Andrianampoinimerina dia mpanjaka tany Antananarivo",
  "entity_types": ["PERSON", "CITY"]
}
```

**Paramètres:**
- `text` (string, requis) : Le texte à analyser
- `entity_types` (array, optionnel) : Types d'entités à détecter

**Réponse:**
```json
{
  "text": "Andrianampoinimerina dia mpanjaka tany Antananarivo",
  "entities": [
    {
      "entity": "Andrianampoinimerina",
      "text": "Andrianampoinimerina",
      "type": "PERSON",
      "start": 0,
      "end": 20,
      "confidence": 1.0,
      "metadata": {
        "role": "Roi unificateur",
        "period": "1787-1810"
      }
    },
    {
      "entity": "Antananarivo",
      "text": "Antananarivo",
      "type": "CITY",
      "start": 39,
      "end": 51,
      "confidence": 1.0,
      "metadata": {
        "region": "Analamanga"
      }
    }
  ],
  "count": 2
}
```

**Exemples:**

```bash
# cURL
curl -X POST http://localhost:5000/ner/recognize \
  -H "Content-Type: application/json" \
  -d '{"text": "Andrianampoinimerina dia mpanjaka tany Antananarivo"}'
```

```python
# Python
import requests

response = requests.post('http://localhost:5000/ner/recognize', json={
    'text': 'Andrianampoinimerina dia mpanjaka tany Antananarivo'
})

for entity in response.json()['entities']:
    print(f"{entity['text']} [{entity['type']}]")
```

---

### 3. Extraire par type

**POST** `/ner/extract`

Extrait uniquement les entités d'un type spécifique.

**Body:**
```json
{
  "text": "Nankany Antsirabe sy Fianarantsoa izy",
  "entity_type": "CITY"
}
```

**Paramètres:**
- `text` (string, requis) : Le texte à analyser
- `entity_type` (string, requis) : Type d'entité à extraire

**Réponse:**
```json
{
  "text": "Nankany Antsirabe sy Fianarantsoa izy",
  "entity_type": "CITY",
  "entities": ["Antsirabe", "Fianarantsoa"],
  "count": 2
}
```

**Exemple:**
```bash
curl -X POST http://localhost:5000/ner/extract \
  -H "Content-Type: application/json" \
  -d '{"text": "Nankany Antsirabe sy Fianarantsoa izy", "entity_type": "CITY"}'
```

---

### 4. Annoter le texte

**POST** `/ner/annotate`

Annote le texte avec les entités détectées.

**Body:**
```json
{
  "text": "Andrianampoinimerina dia mpanjaka tany Antananarivo",
  "format": "html"
}
```

**Paramètres:**
- `text` (string, requis) : Le texte à annoter
- `format` (string, optionnel) : "html" ou "markdown" (défaut: "html")

**Réponse:**
```json
{
  "original_text": "Andrianampoinimerina dia mpanjaka tany Antananarivo",
  "annotated_text": "<span style=\"...\">Andrianampoinimerina</span> dia mpanjaka tany <span style=\"...\">Antananarivo</span>",
  "entities": [...],
  "format": "html"
}
```

**Code couleur HTML:**
- 🔵 Bleu : PERSON
- 🟢 Vert : CITY
- 🟠 Orange : ORG
- 🟣 Violet : LOC
- 🔴 Rouge : DATE
- 🩷 Rose : EVENT

---

### 5. Ajouter une entité

**POST** `/ner/add_entity`

Ajoute une nouvelle entité au système.

**Body:**
```json
{
  "entity": "Tsimbazaza",
  "entity_type": "LOC",
  "variations": ["Parc Tsimbazaza"],
  "metadata": {
    "type": "parc zoologique"
  }
}
```

**Paramètres:**
- `entity` (string, requis) : Nom de l'entité
- `entity_type` (string, requis) : Type d'entité
- `variations` (array, optionnel) : Variations du nom
- `metadata` (object, optionnel) : Métadonnées

**Réponse:**
```json
{
  "message": "Entité ajoutée avec succès",
  "entity": "Tsimbazaza",
  "entity_type": "LOC"
}
```

---

### 6. Traitement par lots

**POST** `/ner/batch_recognize`

Reconnaît les entités dans plusieurs textes.

**Body:**
```json
{
  "texts": [
    "Andrianampoinimerina dia mpanjaka tany Antananarivo",
    "Ranavalona I dia mpanjaka malaza"
  ]
}
```

**Réponse:**
```json
{
  "results": [
    {
      "text": "Andrianampoinimerina dia mpanjaka tany Antananarivo",
      "entities": [...],
      "count": 2
    },
    {
      "text": "Ranavalona I dia mpanjaka malaza",
      "entities": [...],
      "count": 1
    }
  ],
  "total_texts": 2
}
```

---

### 7. Statistiques

**GET** `/ner/stats`

Retourne les statistiques du système NER.

**Réponse:**
```json
{
  "entity_types": {
    "PERSON": 19,
    "CITY": 20,
    "ORG": 20,
    "LOC": 22,
    "EVENT": 12
  },
  "total_entities": 93,
  "total_variations": 47
}
```

---

### 8. Types d'entités

**GET** `/ner/entity_types`

Liste les types d'entités supportés.

**Réponse:**
```json
{
  "entity_types": ["PERSON", "CITY", "ORG", "LOC", "DATE", "EVENT"],
  "descriptions": {
    "PERSON": "Personnalités, noms de personnes",
    "CITY": "Villes et communes",
    ...
  }
}
```

---

## 💻 Exemples d'utilisation

### Exemple complet en Python

```python
import requests

BASE_URL = "http://localhost:5000"

# 1. Health check global
response = requests.get(f"{BASE_URL}/health")
print("Services:", response.json())

# 2. Autocomplétion - Prédire
response = requests.post(f"{BASE_URL}/autocompletion/predict", json={
    "context": "Ny fiainana dia",
    "num_predictions": 3
})
predictions = response.json()['predictions']
print("\nPrédictions:", predictions)

# 3. Autocomplétion - Compléter
response = requests.post(f"{BASE_URL}/autocompletion/complete", json={
    "context": "Ny tanora dia",
    "num_words": 5
})
print("\nComplétion:", response.json()['full_text'])

# 4. NER - Reconnaître
response = requests.post(f"{BASE_URL}/ner/recognize", json={
    "text": "Andrianampoinimerina dia mpanjaka tany Antananarivo"
})
entities = response.json()['entities']
print("\nEntités détectées:")
for entity in entities:
    print(f"  - {entity['text']} [{entity['type']}] (confiance: {entity['confidence']})")

# 5. NER - Extraire les villes
response = requests.post(f"{BASE_URL}/ner/extract", json={
    "text": "Nankany Antsirabe sy Fianarantsoa izy",
    "entity_type": "CITY"
})
cities = response.json()['entities']
print(f"\nVilles: {', '.join(cities)}")
```

### Exemple avec React

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

function MalagasyNLP() {
  const [text, setText] = useState('');
  const [entities, setEntities] = useState([]);
  const [predictions, setPredictions] = useState([]);
  
  const recognizeEntities = async () => {
    const response = await axios.post(`${BASE_URL}/ner/recognize`, {
      text: text
    });
    setEntities(response.data.entities);
  };
  
  const predictNext = async () => {
    const response = await axios.post(`${BASE_URL}/autocompletion/predict`, {
      context: text,
      num_predictions: 5
    });
    setPredictions(response.data.predictions);
  };
  
  return (
    <div>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Entrez du texte malgache..."
      />
      
      <button onClick={recognizeEntities}>Détecter les entités</button>
      <button onClick={predictNext}>Prédire le prochain mot</button>
      
      <div>
        <h3>Entités:</h3>
        {entities.map((e, i) => (
          <div key={i}>{e.text} [{e.type}]</div>
        ))}
      </div>
      
      <div>
        <h3>Prédictions:</h3>
        {predictions.map(([word, prob], i) => (
          <div key={i}>{word} ({(prob * 100).toFixed(1)}%)</div>
        ))}
      </div>
    </div>
  );
}
```

---

## ⚠️ Codes d'erreur

### Codes HTTP

| Code | Signification |
|------|---------------|
| 200 | OK - Requête réussie |
| 400 | Bad Request - Paramètres invalides |
| 500 | Internal Server Error - Erreur serveur |

### Messages d'erreur

**400 - Paramètres manquants:**
```json
{
  "error": "Le champ 'text' est requis"
}
```

**500 - Erreur serveur:**
```json
{
  "error": "Message d'erreur détaillé..."
}
```

---

## 📊 Récapitulatif des endpoints

### Routes globales
- `GET /` - Page d'accueil
- `GET /health` - Health check global

### Autocomplétion (`/autocompletion`)
- `GET /health` - Health check
- `POST /predict` - Prédire le prochain mot
- `POST /complete` - Compléter une phrase
- `POST /train` - Entraîner le modèle
- `GET /stats` - Statistiques

### NER (`/ner`)
- `GET /health` - Health check
- `POST /recognize` - Reconnaître les entités
- `POST /extract` - Extraire par type
- `POST /annotate` - Annoter le texte
- `POST /add_entity` - Ajouter une entité
- `POST /batch_recognize` - Traitement par lots
- `GET /stats` - Statistiques
- `GET /entity_types` - Types d'entités

---

**URL du serveur:** `http://localhost:5000`  
**Version:** 1.0.0  
**Dernière mise à jour:** Décembre 2025
