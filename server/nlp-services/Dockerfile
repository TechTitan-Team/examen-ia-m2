FROM python:3.11-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de requirements
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier tous les fichiers de l'application
COPY . .

# Exposer le port
EXPOSE 5000

# Variable d'environnement pour le port
ENV PORT=5000

# Commande pour démarrer l'application
CMD ["python", "app.py"]

