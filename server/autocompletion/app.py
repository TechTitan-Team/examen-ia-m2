from flask import Flask, request, jsonify
from flask_cors import CORS
from ngram_model import NGramModel
import os

app = Flask(__name__)
CORS(app)

# Initialiser le modèle N-gram
model = NGramModel(n=3)  # Tri-grams par défaut

# Charger le corpus au démarrage
corpus_path = os.path.join(os.path.dirname(__file__), 'corpus', 'corpus_malagasy.txt')
if os.path.exists(corpus_path):
    print(f"Chargement du corpus depuis {corpus_path}...")
    model.train_from_file(corpus_path)
    print(f"Modèle entraîné avec succès!")
else:
    print(f"Attention: Aucun corpus trouvé à {corpus_path}")

@app.route('/health', methods=['GET'])
def health():
    """Endpoint pour vérifier que l'API est en ligne"""
    return jsonify({
        'status': 'ok',
        'message': 'API d\'autocomplétion malgache opérationnelle',
        'model_info': {
            'n': model.n,
            'vocabulary_size': len(model.vocabulary),
            'trained': len(model.ngrams) > 0
        }
    })

@app.route('/predict', methods=['POST'])
def predict():
    """
    Prédire le(s) prochain(s) mot(s) basé sur le contexte fourni
    
    Body JSON:
    {
        "context": "string - le texte de contexte",
        "num_predictions": int - nombre de prédictions à retourner (défaut: 5)
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'context' not in data:
            return jsonify({
                'error': 'Le champ "context" est requis'
            }), 400
        
        context = data['context']
        num_predictions = data.get('num_predictions', 5)
        
        # Obtenir les prédictions
        predictions = model.predict_next_word(context, top_k=num_predictions)
        
        return jsonify({
            'context': context,
            'predictions': predictions
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/complete', methods=['POST'])
def complete():
    """
    Compléter une phrase avec plusieurs mots
    
    Body JSON:
    {
        "context": "string - le texte de contexte",
        "num_words": int - nombre de mots à générer (défaut: 3),
        "num_alternatives": int - nombre d'alternatives pour chaque position (défaut: 1)
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'context' not in data:
            return jsonify({
                'error': 'Le champ "context" est requis'
            }), 400
        
        context = data['context']
        num_words = data.get('num_words', 3)
        num_alternatives = data.get('num_alternatives', 1)
        
        # Générer la complétion
        completion = model.generate_sequence(context, length=num_words)
        
        return jsonify({
            'context': context,
            'completion': completion,
            'full_text': f"{context} {completion}".strip()
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/train', methods=['POST'])
def train():
    """
    Entraîner ou ré-entraîner le modèle avec un nouveau corpus
    
    Body JSON:
    {
        "text": "string - texte pour entraîner le modèle",
        "reset": bool - réinitialiser le modèle avant l'entraînement (défaut: false)
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({
                'error': 'Le champ "text" est requis'
            }), 400
        
        text = data['text']
        reset = data.get('reset', False)
        
        if reset:
            model.reset()
        
        # Entraîner le modèle
        model.train(text)
        
        return jsonify({
            'message': 'Modèle entraîné avec succès',
            'vocabulary_size': len(model.vocabulary),
            'ngrams_count': len(model.ngrams)
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/stats', methods=['GET'])
def stats():
    """Obtenir les statistiques du modèle"""
    return jsonify({
        'n': model.n,
        'vocabulary_size': len(model.vocabulary),
        'ngrams_count': len(model.ngrams),
        'total_sequences': sum(sum(counts.values()) for counts in model.ngrams.values())
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)

