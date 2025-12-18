import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password, rememberMe = false) => {
    setError("");
    setLoading(true);

    try {
      const result = await api.login(email, password);
      
      if (result.success) {
        // Stocker les données utilisateur selon "Remember me"
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(result.data));
        } else {
          sessionStorage.setItem("user", JSON.stringify(result.data));
        }
        
        // Rediriger vers la page Home
        navigate("/home");
        
        return { success: true, data: result.data };
      } else {
        setError(result.error || "Tsy nahomby ny fidirana");
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = "Nisy olana nitranga. Andramo indray azafady.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
    setError,
  };
};

