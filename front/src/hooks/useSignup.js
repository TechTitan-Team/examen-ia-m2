import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";

export const useSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signup = async (name, last_name, email, password, confirmPassword) => {
    setError("");
    setLoading(true);

    try {
      // Validation côté client
      if (password !== confirmPassword) {
        const errorMsg = "Ny teny miafina dia tsy mitovy";
        setError(errorMsg);
        setLoading(false);
        return { success: false, error: errorMsg };
      }

      if (password.length < 6) {
        const errorMsg = "Ny teny miafina dia tsy maintsy misy farafahakeliny 6 litera";
        setError(errorMsg);
        setLoading(false);
        return { success: false, error: errorMsg };
      }

      const result = await api.signup(name, last_name, email, password);
      
      if (result.success) {
        // Stocker les données utilisateur
        localStorage.setItem("user", JSON.stringify(result.data));
        
        // Rediriger vers la page de login
        navigate("/login");
        
        return { success: true, data: result.data };
      } else {
        setError(result.error || "Tsy nahomby ny fisoratana anarana");
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
    signup,
    loading,
    error,
    setError,
  };
};

