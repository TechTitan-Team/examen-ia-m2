import re
from collections import defaultdict, Counter
from typing import List, Tuple, Dict
import pickle
import os

class NGramModel:
    """
    Modèle N-gram pour la prédiction du prochain mot.
    Supporte les bi-grams, tri-grams, et n-grams d'ordre supérieur.
    """
    
    def __init__(self, n: int = 3):
        """
        Initialiser le modèle N-gram
        
        Args:
            n: Ordre du modèle (2 pour bi-grams, 3 pour tri-grams, etc.)
        """
        self.n = n
        self.ngrams = defaultdict(Counter)  # {(w1, w2, ...): Counter({next_word: count})}
        self.vocabulary = set()
        
    def preprocess_text(self, text: str) -> List[str]:
        """
        Prétraiter le texte: tokenisation et normalisation
        
        Args:
            text: Texte brut
            
        Returns:
            Liste de tokens
        """
        # Convertir en minuscules
        text = text.lower()
        
        # Remplacer les sauts de ligne par des espaces
        text = text.replace('\n', ' ')
        
        # Tokeniser (garder les apostrophes dans les mots)
        tokens = re.findall(r"\b[\w']+\b|[.,!?;]", text)
        
        return tokens
    
    def train(self, text: str):
        """
        Entraîner le modèle sur un corpus de texte
        
        Args:
            text: Texte d'entraînement
        """
        tokens = self.preprocess_text(text)
        
        # Ajouter au vocabulaire
        self.vocabulary.update(tokens)
        
        # Créer les n-grams
        for i in range(len(tokens) - self.n + 1):
            # Prendre n-1 mots comme contexte
            context = tuple(tokens[i:i + self.n - 1])
            # Le n-ième mot est le mot suivant
            next_word = tokens[i + self.n - 1]
            
            # Incrémenter le compteur
            self.ngrams[context][next_word] += 1
    
    def train_from_file(self, filepath: str):
        """
        Entraîner le modèle à partir d'un fichier
        
        Args:
            filepath: Chemin vers le fichier corpus
        """
        with open(filepath, 'r', encoding='utf-8') as f:
            text = f.read()
        
        self.train(text)
    
    def predict_next_word(self, context: str, top_k: int = 5) -> List[Tuple[str, float]]:
        """
        Prédire les k mots les plus probables suivant le contexte
        
        Args:
            context: Texte de contexte
            top_k: Nombre de prédictions à retourner
            
        Returns:
            Liste de tuples (mot, probabilité)
        """
        tokens = self.preprocess_text(context)
        
        # Prendre les (n-1) derniers mots comme contexte
        context_tuple = tuple(tokens[-(self.n - 1):])
        
        # Si le contexte est trop court, le compléter avec des mots vides
        if len(context_tuple) < self.n - 1:
            context_tuple = ('',) * (self.n - 1 - len(context_tuple)) + context_tuple
        
        # Obtenir les compteurs pour ce contexte
        if context_tuple not in self.ngrams:
            # Essayer avec un contexte plus court (backoff)
            return self._backoff_predict(tokens, top_k)
        
        next_words = self.ngrams[context_tuple]
        total = sum(next_words.values())
        
        # Calculer les probabilités et trier
        predictions = [
            (word, count / total)
            for word, count in next_words.most_common(top_k)
        ]
        
        return predictions
    
    def _backoff_predict(self, tokens: List[str], top_k: int) -> List[Tuple[str, float]]:
        """
        Stratégie de backoff: essayer avec un contexte plus court
        
        Args:
            tokens: Liste de tokens du contexte
            top_k: Nombre de prédictions
            
        Returns:
            Liste de tuples (mot, probabilité)
        """
        # Essayer avec un contexte de plus en plus court
        for context_length in range(min(len(tokens), self.n - 1), 0, -1):
            context_tuple = tuple(tokens[-context_length:])
            
            # Chercher tous les n-grams qui se terminent par ce contexte
            matching_ngrams = Counter()
            
            for ngram_context, next_words in self.ngrams.items():
                if ngram_context[-context_length:] == context_tuple:
                    matching_ngrams.update(next_words)
            
            if matching_ngrams:
                total = sum(matching_ngrams.values())
                predictions = [
                    (word, count / total)
                    for word, count in matching_ngrams.most_common(top_k)
                ]
                return predictions
        
        # Si aucun contexte ne correspond, retourner les mots les plus fréquents
        all_words = Counter()
        for next_words in self.ngrams.values():
            all_words.update(next_words)
        
        if all_words:
            total = sum(all_words.values())
            return [
                (word, count / total)
                for word, count in all_words.most_common(top_k)
            ]
        
        return []
    
    def generate_sequence(self, context: str, length: int = 5) -> str:
        """
        Générer une séquence de mots en utilisant le modèle
        
        Args:
            context: Texte de départ
            length: Nombre de mots à générer
            
        Returns:
            Texte généré
        """
        generated_tokens = []
        current_context = context
        
        for _ in range(length):
            predictions = self.predict_next_word(current_context, top_k=1)
            
            if not predictions:
                break
            
            next_word = predictions[0][0]
            generated_tokens.append(next_word)
            
            # Mettre à jour le contexte
            current_context = f"{current_context} {next_word}"
        
        return ' '.join(generated_tokens)
    
    def reset(self):
        """Réinitialiser le modèle"""
        self.ngrams = defaultdict(Counter)
        self.vocabulary = set()
    
    def save(self, filepath: str):
        """Sauvegarder le modèle"""
        with open(filepath, 'wb') as f:
            pickle.dump({
                'n': self.n,
                'ngrams': dict(self.ngrams),
                'vocabulary': self.vocabulary
            }, f)
    
    def load(self, filepath: str):
        """Charger un modèle sauvegardé"""
        with open(filepath, 'rb') as f:
            data = pickle.load(f)
            self.n = data['n']
            self.ngrams = defaultdict(Counter, data['ngrams'])
            self.vocabulary = data['vocabulary']

