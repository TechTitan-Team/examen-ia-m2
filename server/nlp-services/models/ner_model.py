import re
import json
import os
from typing import List, Dict, Set, Optional, Tuple
from collections import defaultdict

class MalagasyNER:
    """
    Système de Reconnaissance d'Entités Nommées (NER) pour le malgache.
    Utilise une approche basée sur des dictionnaires et des patterns.
    """
    
    def __init__(self):
        """Initialiser le système NER"""
        self.entities = defaultdict(dict)  # {entity_type: {entity: metadata}}
        self.entity_patterns = defaultdict(set)  # {entity_type: set of patterns}
        self.variations = defaultdict(set)  # {entity: set of variations}
        
        # Types d'entités supportés
        self.ENTITY_TYPES = {
            'PERSON': 'Personnalités, noms de personnes',
            'CITY': 'Villes et communes',
            'ORG': 'Organisations, institutions',
            'LOC': 'Lieux, régions',
            'DATE': 'Dates et périodes',
            'EVENT': 'Événements historiques ou culturels'
        }
        
        # Patterns pour la détection contextuelle
        self.context_patterns = {
            'PERSON': [
                r'\b(Andriana|Ramatoa|Andriamatoa|Mpanjaka|Lehiben\'ny)\s+(\w+)',
                r'\b(Mpitandrina|Pastora|Dokotera|Profesora)\s+(\w+)',
            ],
            'CITY': [
                r'\b(any|ao|eto|avy)\s+(\w+)',
                r'\b(tanàna|tanànan\'ny)\s+(\w+)',
            ],
            'DATE': [
                r'\b(\d{1,2})\s+(Janoary|Febroary|Martsa|Aprily|Mey|Jona|Jolay|Aogositra|Septambra|Oktobra|Novambra|Desambra)\s+(\d{4})',
                r'\b(taona)\s+(\d{4})',
            ]
        }
    
    def add_entity(self, entity: str, entity_type: str, 
                   variations: List[str] = None, metadata: Dict = None):
        """
        Ajouter une entité au système
        
        Args:
            entity: Nom de l'entité
            entity_type: Type d'entité (PERSON, CITY, ORG, etc.)
            variations: Liste de variations de l'entité
            metadata: Métadonnées additionnelles
        """
        if entity_type not in self.ENTITY_TYPES:
            raise ValueError(f"Type d'entité non supporté: {entity_type}")
        
        # Normaliser l'entité
        entity_normalized = entity.strip()
        
        # Ajouter l'entité
        self.entities[entity_type][entity_normalized] = metadata or {}
        
        # Ajouter les variations
        if variations:
            for var in variations:
                self.variations[entity_normalized].add(var.strip())
        
        # Créer un pattern pour cette entité
        self.entity_patterns[entity_type].add(entity_normalized.lower())
        for var in self.variations[entity_normalized]:
            self.entity_patterns[entity_type].add(var.lower())
    
    def load_entities_from_file(self, filepath: str, entity_type: str):
        """
        Charger des entités depuis un fichier JSON
        
        Args:
            filepath: Chemin vers le fichier JSON
            entity_type: Type d'entité
        """
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        for item in data:
            entity = item.get('name')
            variations = item.get('variations', [])
            metadata = {k: v for k, v in item.items() if k not in ['name', 'variations']}
            
            if entity:
                self.add_entity(entity, entity_type, variations=variations, metadata=metadata)
    
    def load_entities_from_directory(self, directory: str):
        """
        Charger toutes les entités depuis un répertoire
        
        Args:
            directory: Chemin vers le répertoire contenant les fichiers JSON
        """
        entity_files = {
            'cities.json': 'CITY',
            'persons.json': 'PERSON',
            'organizations.json': 'ORG',
            'locations.json': 'LOC',
            'events.json': 'EVENT'
        }
        
        for filename, entity_type in entity_files.items():
            filepath = os.path.join(directory, filename)
            if os.path.exists(filepath):
                print(f"  Chargement de {filename}...")
                self.load_entities_from_file(filepath, entity_type)
    
    def recognize_entities(self, text: str, 
                          entity_types: Optional[List[str]] = None) -> List[Dict]:
        """
        Reconnaître les entités dans un texte
        
        Args:
            text: Texte à analyser
            entity_types: Types d'entités à détecter (None = tous)
        
        Returns:
            Liste de dictionnaires contenant les entités détectées
        """
        if entity_types is None:
            entity_types = list(self.ENTITY_TYPES.keys())
        
        entities_found = []
        text_lower = text.lower()
        
        # Détecter les entités par correspondance directe
        for entity_type in entity_types:
            if entity_type not in self.entities:
                continue
            
            for entity, metadata in self.entities[entity_type].items():
                # Chercher l'entité et ses variations
                all_forms = [entity] + list(self.variations.get(entity, []))
                
                for form in all_forms:
                    # Utiliser une regex pour trouver les occurrences (word boundaries)
                    pattern = r'\b' + re.escape(form) + r'\b'
                    matches = re.finditer(pattern, text, re.IGNORECASE)
                    
                    for match in matches:
                        entities_found.append({
                            'entity': entity,
                            'text': match.group(),
                            'type': entity_type,
                            'start': match.start(),
                            'end': match.end(),
                            'confidence': 1.0 if form == entity else 0.9,
                            'metadata': metadata
                        })
        
        # Détecter avec les patterns contextuels
        entities_found.extend(self._detect_with_context(text, entity_types))
        
        # Trier par position et éliminer les doublons
        entities_found = self._remove_overlaps(entities_found)
        entities_found.sort(key=lambda x: x['start'])
        
        return entities_found
    
    def _detect_with_context(self, text: str, entity_types: List[str]) -> List[Dict]:
        """
        Détecter les entités en utilisant les patterns contextuels
        
        Args:
            text: Texte à analyser
            entity_types: Types d'entités à détecter
        
        Returns:
            Liste d'entités détectées
        """
        entities_found = []
        
        for entity_type in entity_types:
            if entity_type not in self.context_patterns:
                continue
            
            for pattern in self.context_patterns[entity_type]:
                matches = re.finditer(pattern, text, re.IGNORECASE)
                
                for match in matches:
                    # Extraire le nom de l'entité (généralement le dernier groupe)
                    entity_text = match.group(match.lastindex) if match.lastindex else match.group()
                    
                    entities_found.append({
                        'entity': entity_text,
                        'text': match.group(),
                        'type': entity_type,
                        'start': match.start(),
                        'end': match.end(),
                        'confidence': 0.7,  # Confiance plus faible pour détection contextuelle
                        'metadata': {'detected_by': 'context_pattern'}
                    })
        
        return entities_found
    
    def _remove_overlaps(self, entities: List[Dict]) -> List[Dict]:
        """
        Éliminer les entités qui se chevauchent, garder celle avec la meilleure confiance
        
        Args:
            entities: Liste d'entités
        
        Returns:
            Liste d'entités sans chevauchements
        """
        if not entities:
            return []
        
        # Trier par position de début puis par confiance décroissante
        sorted_entities = sorted(entities, key=lambda x: (x['start'], -x['confidence']))
        
        result = []
        last_end = -1
        
        for entity in sorted_entities:
            if entity['start'] >= last_end:
                result.append(entity)
                last_end = entity['end']
        
        return result
    
    def extract_by_type(self, text: str, entity_type: str) -> List[str]:
        """
        Extraire uniquement les entités d'un type spécifique
        
        Args:
            text: Texte à analyser
            entity_type: Type d'entité
        
        Returns:
            Liste des entités trouvées
        """
        entities = self.recognize_entities(text, entity_types=[entity_type])
        return [e['entity'] for e in entities]
    
    def annotate_text(self, text: str, format_type: str = 'html') -> str:
        """
        Annoter le texte avec les entités détectées
        
        Args:
            text: Texte à annoter
            format_type: Format de sortie ('html' ou 'markdown')
        
        Returns:
            Texte annoté
        """
        entities = self.recognize_entities(text)
        
        if not entities:
            return text
        
        # Trier par position décroissante pour remplacer de la fin vers le début
        entities.sort(key=lambda x: x['start'], reverse=True)
        
        result = text
        
        for entity in entities:
            entity_text = entity['text']
            entity_type = entity['type']
            
            if format_type == 'html':
                # Couleurs par type d'entité
                colors = {
                    'PERSON': '#3b82f6',
                    'CITY': '#10b981',
                    'ORG': '#f59e0b',
                    'LOC': '#8b5cf6',
                    'DATE': '#ef4444',
                    'EVENT': '#ec4899'
                }
                color = colors.get(entity_type, '#6b7280')
                
                annotated = f'<span style="background-color: {color}20; border-bottom: 2px solid {color}; padding: 2px 4px; border-radius: 3px;" title="{entity_type}: {entity["entity"]}">{entity_text}</span>'
            
            elif format_type == 'markdown':
                annotated = f'**[{entity_text}]({entity_type})**'
            
            else:
                annotated = f'[{entity_text}|{entity_type}]'
            
            # Remplacer dans le texte
            result = result[:entity['start']] + annotated + result[entity['end']:]
        
        return result
    
    def get_stats(self) -> Dict:
        """Obtenir les statistiques du système"""
        stats = {}
        for entity_type in self.ENTITY_TYPES.keys():
            count = len(self.entities.get(entity_type, {}))
            stats[entity_type] = count
        
        return {
            'entity_types': stats,
            'total_entities': sum(stats.values()),
            'total_variations': sum(len(v) for v in self.variations.values())
        }
    
    def get_entity_types(self) -> List[str]:
        """Obtenir la liste des types d'entités supportés"""
        return list(self.ENTITY_TYPES.keys())
    
    def save_entities(self, filepath: str, entity_type: str):
        """
        Sauvegarder les entités d'un type dans un fichier JSON
        
        Args:
            filepath: Chemin du fichier de sortie
            entity_type: Type d'entité à sauvegarder
        """
        if entity_type not in self.entities:
            return
        
        data = []
        for entity, metadata in self.entities[entity_type].items():
            item = {
                'name': entity,
                'variations': list(self.variations.get(entity, [])),
                **metadata
            }
            data.append(item)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

