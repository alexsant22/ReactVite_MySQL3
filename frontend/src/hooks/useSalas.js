import { useState, useEffect } from "react";
import { salasService } from "../services/salasService";

export function useSalas() {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarSalas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await salasService.listar();
      setSalas(data);
    } catch (err) {
      setError("Erro ao carregar salas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarSalas();
  }, []);

  return {
    salas,
    loading,
    error,
    recarregar: carregarSalas,
  };
}
