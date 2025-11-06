import { api } from "./api.js";

export const reservasService = {
  async listar() {
    const response = await api.get("/reservas");
    return response.data;
  },

  async buscar(id) {
    const response = await api.get(`/reservas/${id}`);
    return response.data;
  },

  async criar(reserva) {
    const response = await api.post("/reservas", reserva);
    return response.data;
  },

  async atualizar(id, reserva) {
    const response = await api.put(`/reservas/${id}`, reserva);
    return response.data;
  },

  async excluir(id) {
    const response = await api.delete(`/reservas/${id}`);
    return response.data;
  },
};
