import { useState, useEffect } from "react";
import { usuariosService } from "../services/usuariosService";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await usuariosService.listar();
      setUsuarios(data);
    } catch (err) {
      setError("Erro ao carregar usuários");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return {
    usuarios,
    loading,
    error,
    recarregar: carregarUsuarios,
  };
}
