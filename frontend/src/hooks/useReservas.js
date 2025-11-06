import { useState, useEffect } from "react";
import { reservasService } from "../services/reservasService";

export function useReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarReservas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reservasService.listar();
      setReservas(data);
    } catch (err) {
      setError("Erro ao carregar reservas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarReservas();
  }, []);

  return {
    reservas,
    loading,
    error,
    recarregar: carregarReservas,
  };
}
