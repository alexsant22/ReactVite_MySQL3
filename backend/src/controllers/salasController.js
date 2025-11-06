import { Sala } from "../models/Sala.js";

export const salasController = {
  async listarSalas(req, res, next) {
    try {
      const salas = await Sala.findAll();
      res.json(salas);
    } catch (error) {
      next(error);
    }
  },

  async buscarSala(req, res, next) {
    try {
      const sala = await Sala.findById(req.params.id);
      if (!sala) {
        return res.status(404).json({ error: "Sala não encontrada" });
      }
      res.json(sala);
    } catch (error) {
      next(error);
    }
  },

  async criarSala(req, res, next) {
    try {
      const novaSala = await Sala.create(req.body);
      res.status(201).json(novaSala);
    } catch (error) {
      next(error);
    }
  },

  async atualizarSala(req, res, next) {
    try {
      const salaAtualizada = await Sala.update(req.params.id, req.body);
      res.json(salaAtualizada);
    } catch (error) {
      next(error);
    }
  },

  async excluirSala(req, res, next) {
    try {
      await Sala.delete(req.params.id);
      res.json({ message: "Sala excluída com sucesso" });
    } catch (error) {
      next(error);
    }
  },
};
