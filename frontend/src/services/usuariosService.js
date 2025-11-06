import { api } from "./api.js";

export const usuariosService = {
  async listar() {
    const response = await api.get("/usuarios");
    return response.data;
  },

  async buscar(id) {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  async criar(usuario) {
    const response = await api.post("/usuarios", usuario);
    return response.data;
  },

  async atualizar(id, usuario) {
    const response = await api.put(`/usuarios/${id}`, usuario);
    return response.data;
  },

  async excluir(id) {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  },
};
