"""
Serveur Flask unifié pour les services NLP Malgache
- Autocomplétion : /autocompletion/*
- Reconnaissance d'Entités : /ner/*
"""

from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import os
import sys

# Importer les modèles
sys.path.append(os.path.dirname(__file__))
from models.ngram_model import NGramModel
from models.ner_model import MalagasyNER

app = Flask(__name__)
CORS(app)

# ============================================================================
# INITIALISATION DES MODÈLES
# ============================================================================

# Modèle N-gram pour l'autocomplétion
ngram_model = NGramModel(n=3)
corpus_path = os.path.join(os.path.dirname(__file__), 'data', 'corpus', 'corpus_malagasy.txt')
if os.path.exists(corpus_path):
    print(f"Chargement du corpus depuis {corpus_path}...")
    ngram_model.train_from_file(corpus_path)
    print(f"Modèle N-gram entraîné avec succès!")
else:
    print(f"Attention: Aucun corpus trouvé à {corpus_path}")

# Modèle NER
ner_model = MalagasyNER()
entities_dir = os.path.join(os.path.dirname(__file__), 'data', 'entities')
if os.path.exists(entities_dir):
    print(f"Chargement des entités depuis {entities_dir}...")
    ner_model.load_entities_from_directory(entities_dir)
    print(f"Entités NER chargées avec succès!")
else:
    print(f"Attention: Aucun répertoire d'entités trouvé à {entities_dir}")

# ============================================================================
# ROUTES PRINCIPALES
# ============================================================================

@app.route('/', methods=['GET'])
def index():
    """Page d'accueil avec informations sur les services"""
    return jsonify({
        'message': 'Services NLP Malgache',
        'version': '1.0.0',
        'services': {
            'combined': {
                'base_url': '/',
                'endpoints': [
                    'POST /analyze - Autocomplétion + NER combinés'
                ]
            },
            'autocompletion': {
                'base_url': '/autocompletion',
                'endpoints': [
                    'GET /autocompletion/health',
                    'POST /autocompletion/predict',
                    'POST /autocompletion/complete',
                    'POST /autocompletion/train',
                    'GET /autocompletion/stats'
                ]
            },
            'ner': {
                'base_url': '/ner',
                'endpoints': [
                    'GET /ner/health',
                    'POST /ner/recognize',
                    'POST /ner/extract',
                    'POST /ner/annotate',
                    'POST /ner/add_entity',
                    'POST /ner/batch_recognize',
                    'GET /ner/stats',
                    'GET /ner/entity_types'
                ]
            }
        },
        'documentation': '/docs'
    })

@app.route('/health', methods=['GET'])
def global_health():
    """Health check global"""
    return jsonify({
        'status': 'ok',
        'message': 'Services NLP Malgache opérationnels',
        'services': {
            'autocompletion': {
                'status': 'ok',
                'vocabulary_size': len(ngram_model.vocabulary),
                'trained': len(ngram_model.ngrams) > 0
            },
            'ner': {
                'status': 'ok',
                'entities_loaded': ner_model.get_stats()['total_entities']
            }
        }
    })

@app.route('/analyze', methods=['POST'])
def analyze():
    """
    Endpoint combiné : Autocomplétion + Reconnaissance d'Entités
    
    Complète le texte fourni et détecte les entités dans le texte complet.
    """
    try:
        data = request.get_json()
        
        if not data or 'context' not in data:
            return jsonify({'error': 'Le champ "context" est requis'}), 400
        
        context = data['context']
        num_words = data.get('num_words', 10)
        entity_types = data.get('entity_types', None)
        
        # 1. Autocomplétion - Générer la suite du texte
        completion = ngram_model.generate_sequence(context, length=num_words)
        full_text = f"{context} {completion}".strip()
        
        # 2. NER - Reconnaître les entités dans le texte original
        entities_in_context = ner_model.recognize_entities(context, entity_types=entity_types)
        
        # 3. NER - Reconnaître les entités dans le texte complet
        entities_in_full = ner_model.recognize_entities(full_text, entity_types=entity_types)
        
        # 4. NER - Reconnaître les entités uniquement dans la complétion
        entities_in_completion = ner_model.recognize_entities(completion, entity_types=entity_types)
        
        # 5. Créer une version annotée du texte complet
        annotated_text = ner_model.annotate_text(full_text, format_type='html')
        
        return jsonify({
            'input': {
                'context': context,
                'num_words': num_words
            },
            'autocompletion': {
                'completion': completion,
                'full_text': full_text
            },
            'entities': {
                'in_context': {
                    'entities': entities_in_context,
                    'count': len(entities_in_context)
                },
                'in_completion': {
                    'entities': entities_in_completion,
                    'count': len(entities_in_completion)
                },
                'in_full_text': {
                    'entities': entities_in_full,
                    'count': len(entities_in_full)
                }
            },
            'annotated_text': annotated_text,
            'summary': {
                'total_words_generated': len(completion.split()),
                'total_entities_found': len(entities_in_full),
                'entity_types_found': list(set(e['type'] for e in entities_in_full))
            }
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================================================
# BLUEPRINT AUTOCOMPLÉTION
# ============================================================================

autocompletion = Blueprint('autocompletion', __name__, url_prefix='/autocompletion')

@autocompletion.route('/health', methods=['GET'])
def ac_health():
    """Endpoint pour vérifier que le service d'autocomplétion est en ligne"""
    return jsonify({
        'status': 'ok',
        'service': 'autocompletion',
        'message': 'Service d\'autocomplétion malgache opérationnel',
        'model_info': {
            'n': ngram_model.n,
            'vocabulary_size': len(ngram_model.vocabulary),
            'trained': len(ngram_model.ngrams) > 0
        }
    })

@autocompletion.route('/predict', methods=['POST'])
def ac_predict():
    """Prédire le(s) prochain(s) mot(s) basé sur le contexte fourni"""
    try:
        data = request.get_json()
        
        if not data or 'context' not in data:
            return jsonify({'error': 'Le champ "context" est requis'}), 400
        
        context = data['context']
        num_predictions = data.get('num_predictions', 5)
        
        predictions = ngram_model.predict_next_word(context, top_k=num_predictions)
        
        return jsonify({
            'context': context,
            'predictions': predictions
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@autocompletion.route('/complete', methods=['POST'])
def ac_complete():
    """Compléter une phrase avec plusieurs mots"""
    try:
        data = request.get_json()
        
        if not data or 'context' not in data:
            return jsonify({'error': 'Le champ "context" est requis'}), 400
        
        context = data['context']
        num_words = data.get('num_words', 3)
        
        completion = ngram_model.generate_sequence(context, length=num_words)
        
        return jsonify({
            'context': context,
            'completion': completion,
            'full_text': f"{context} {completion}".strip()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@autocompletion.route('/train', methods=['POST'])
def ac_train():
    """Entraîner ou ré-entraîner le modèle avec un nouveau corpus"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'Le champ "text" est requis'}), 400
        
        text = data['text']
        reset = data.get('reset', False)
        
        if reset:
            ngram_model.reset()
        
        ngram_model.train(text)
        
        return jsonify({
            'message': 'Modèle entraîné avec succès',
            'vocabulary_size': len(ngram_model.vocabulary),
            'ngrams_count': len(ngram_model.ngrams)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@autocompletion.route('/stats', methods=['GET'])
def ac_stats():
    """Obtenir les statistiques du modèle d'autocomplétion"""
    return jsonify({
        'n': ngram_model.n,
        'vocabulary_size': len(ngram_model.vocabulary),
        'ngrams_count': len(ngram_model.ngrams),
        'total_sequences': sum(sum(counts.values()) for counts in ngram_model.ngrams.values())
    })

# ============================================================================
# BLUEPRINT NER (RECONNAISSANCE D'ENTITÉS)
# ============================================================================

ner = Blueprint('ner', __name__, url_prefix='/ner')

@ner.route('/health', methods=['GET'])
def ner_health():
    """Endpoint pour vérifier que le service NER est en ligne"""
    stats = ner_model.get_stats()
    return jsonify({
        'status': 'ok',
        'service': 'ner',
        'message': 'Service de reconnaissance d\'entités malgache opérationnel',
        'entities_loaded': stats
    })

@ner.route('/recognize', methods=['POST'])
def ner_recognize():
    """Reconnaître les entités nommées dans un texte"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'Le champ "text" est requis'}), 400
        
        text = data['text']
        entity_types = data.get('entity_types', None)
        
        entities = ner_model.recognize_entities(text, entity_types=entity_types)
        
        return jsonify({
            'text': text,
            'entities': entities,
            'count': len(entities)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ner.route('/extract', methods=['POST'])
def ner_extract():
    """Extraire uniquement les entités d'un type spécifique"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data or 'entity_type' not in data:
            return jsonify({'error': 'Les champs "text" et "entity_type" sont requis'}), 400
        
        text = data['text']
        entity_type = data['entity_type']
        
        entities = ner_model.extract_by_type(text, entity_type)
        
        return jsonify({
            'text': text,
            'entity_type': entity_type,
            'entities': entities,
            'count': len(entities)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ner.route('/annotate', methods=['POST'])
def ner_annotate():
    """Annoter le texte avec les entités détectées (format HTML)"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'Le champ "text" est requis'}), 400
        
        text = data['text']
        format_type = data.get('format', 'html')
        
        annotated_text = ner_model.annotate_text(text, format_type=format_type)
        entities = ner_model.recognize_entities(text)
        
        return jsonify({
            'original_text': text,
            'annotated_text': annotated_text,
            'entities': entities,
            'format': format_type
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ner.route('/add_entity', methods=['POST'])
def ner_add_entity():
    """Ajouter une nouvelle entité au système"""
    try:
        data = request.get_json()
        
        if not data or 'entity' not in data or 'entity_type' not in data:
            return jsonify({'error': 'Les champs "entity" et "entity_type" sont requis'}), 400
        
        entity = data['entity']
        entity_type = data['entity_type']
        variations = data.get('variations', [])
        metadata = data.get('metadata', {})
        
        ner_model.add_entity(entity, entity_type, variations=variations, metadata=metadata)
        
        return jsonify({
            'message': 'Entité ajoutée avec succès',
            'entity': entity,
            'entity_type': entity_type
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ner.route('/batch_recognize', methods=['POST'])
def ner_batch_recognize():
    """Reconnaître les entités dans plusieurs textes"""
    try:
        data = request.get_json()
        
        if not data or 'texts' not in data:
            return jsonify({'error': 'Le champ "texts" est requis'}), 400
        
        texts = data['texts']
        entity_types = data.get('entity_types', None)
        
        if not isinstance(texts, list):
            return jsonify({'error': 'Le champ "texts" doit être une liste'}), 400
        
        results = []
        for text in texts:
            entities = ner_model.recognize_entities(text, entity_types=entity_types)
            results.append({
                'text': text,
                'entities': entities,
                'count': len(entities)
            })
        
        return jsonify({
            'results': results,
            'total_texts': len(texts)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ner.route('/stats', methods=['GET'])
def ner_stats():
    """Obtenir les statistiques du système NER"""
    return jsonify(ner_model.get_stats())

@ner.route('/entity_types', methods=['GET'])
def ner_entity_types():
    """Obtenir la liste des types d'entités supportés"""
    return jsonify({
        'entity_types': ner_model.get_entity_types(),
        'descriptions': {
            'PERSON': 'Personnalités, noms de personnes',
            'CITY': 'Villes et communes',
            'ORG': 'Organisations, institutions',
            'LOC': 'Lieux, régions',
            'DATE': 'Dates et périodes',
            'EVENT': 'Événements historiques ou culturels'
        }
    })

# ============================================================================
# ENREGISTREMENT DES BLUEPRINTS
# ============================================================================

app.register_blueprint(autocompletion)
app.register_blueprint(ner)

# ============================================================================
# LANCEMENT DU SERVEUR
# ============================================================================

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5002))
    print(f"\n{'='*60}")
    print(f"🇲🇬 Services NLP Malgache")
    print(f"{'='*60}")
    print(f"Serveur démarré sur: http://localhost:{port}")
    print(f"\nServices disponibles:")
    print(f"  - Autocomplétion: http://localhost:{port}/autocompletion")
    print(f"  - NER: http://localhost:{port}/ner")
    print(f"\nDocumentation: http://localhost:{port}/")
    print(f"{'='*60}\n")
    
    app.run(host='0.0.0.0', port=port, debug=True)

