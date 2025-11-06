import { Usuario } from "../models/Usuario.js"; // <-- AQUI ESTÁ A MUDANÇA

export const usuariosController = {
  async listarUsuarios(req, res, next) {
    try {
      const usuarios = await Usuario.findAll(); // <-- Usando Usuario
      res.json(usuarios);
    } catch (error) {
      next(error);
    }
  },

  async buscarUsuario(req, res, next) {
    try {
      const usuario = await Usuario.findById(req.params.id); // <-- Usando Usuario
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  },

  async criarUsuario(req, res, next) {
    try {
      const novoUsuario = await Usuario.create(req.body); // <-- Usando Usuario
      res.status(201).json(novoUsuario);
    } catch (error) {
      next(error);
    }
  },

  async atualizarUsuario(req, res, next) {
    try {
      const usuarioAtualizado = await Usuario.update(
        // <-- Usando Usuario
        req.params.id,
        req.body
      );
      res.json(usuarioAtualizado);
    } catch (error) {
      next(error);
    }
  },

  async excluirUsuario(req, res, next) {
    try {
      await Usuario.delete(req.params.id); // <-- Usando Usuario
      res.json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
      next(error);
    }
  },
};
