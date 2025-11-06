import { api } from "./api.js";

export const salasService = {
  async listar() {
    const response = await api.get("/salas");
    return response.data;
  },

  async buscar(id) {
    const response = await api.get(`/salas/${id}`);
    return response.data;
  },

  async criar(sala) {
    const response = await api.post("/salas", sala);
    return response.data;
  },

  async atualizar(id, sala) {
    const response = await api.put(`/salas/${id}`, sala);
    return response.data;
  },

  async excluir(id) {
    const response = await api.delete(`/salas/${id}`);
    return response.data;
  },
};
