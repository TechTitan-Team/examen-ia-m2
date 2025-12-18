const API_BASE_URL = 'http://51.222.44.39:9002/api';

export const api = {
  // User endpoints
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Le backend peut retourner une string ou un objet JSON
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      if (!response.ok) {
        throw new Error(typeof data === 'string' ? data : data.message || 'Tsy nahomby ny fidirana');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  signup: async (name, last_name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, last_name, email, password }),
      });

      // Le backend peut retourner une string, un objet JSON, ou un objet d'erreur
      let data;
      const contentType = response.headers.get('content-type');
      
      try {
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }
      } catch (parseError) {
        // Si la réponse n'est pas du JSON valide, essayer de lire comme texte
        data = await response.text();
      }
      
      if (!response.ok) {
        // Gérer différents formats d'erreur
        let errorMessage = 'Tsy nahomby ny fisoratana anarana';
        
        if (typeof data === 'string' && data.trim() !== '') {
          errorMessage = data;
        } else if (data && typeof data === 'object') {
          // Si c'est un objet vide {}, utiliser un message par défaut
          if (Object.keys(data).length === 0) {
            errorMessage = 'Olana amin\'ny mpizara. Jereo fa azo idirana ny base de données.';
          } else if (data.error) {
            errorMessage = data.error;
          } else if (data.message) {
            errorMessage = data.message;
          } else {
            // Essayer de convertir l'objet en string lisible
            const errorStr = JSON.stringify(data);
            if (errorStr !== '{}') {
              errorMessage = errorStr;
            }
          }
        }
        
        throw new Error(errorMessage);
      }

      return { success: true, data };
    } catch (error) {
      // Améliorer le message d'erreur
      let errorMessage = error.message;
      
      // Gérer les erreurs de réseau
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = 'Tsy afaka mampifandray amin\'ny mpizara. Jereo fa mbola miasa ny backend.';
      }
      
      return { success: false, error: errorMessage };
    }
  },
};

