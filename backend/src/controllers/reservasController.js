import { Reserva } from "../models/Reserva.js";

export const reservasController = {
  async listarReservas(req, res, next) {
    try {
      const reservas = await Reserva.findAll();
      res.json(reservas);
    } catch (error) {
      next(error);
    }
  },

  async buscarReserva(req, res, next) {
    try {
      const reserva = await Reserva.findById(req.params.id);
      if (!reserva) {
        return res.status(404).json({ error: "Reserva não encontrada" });
      }
      res.json(reserva);
    } catch (error) {
      next(error);
    }
  },

  async criarReserva(req, res, next) {
    try {
      const { sala_id, data_hora_inicio, data_hora_fim } = req.body;

      // --- LÓGICA DE NEGÓCIO: IMPEDIR DUPLICADAS ---
      const conflitos = await Reserva.verificarConflito(
        sala_id,
        data_hora_inicio,
        data_hora_fim
      );

      if (conflitos > 0) {
        return res.status(409).json({
          error: "Conflito de horário",
          message: "Esta sala já está reservada para este período.",
        });
      }
      // --- FIM DA LÓGICA ---

      const novaReserva = await Reserva.create(req.body);
      res.status(201).json(novaReserva);
    } catch (error) {
      next(error);
    }
  },

  async atualizarReserva(req, res, next) {
    try {
      const { id } = req.params;
      const { sala_id, data_hora_inicio, data_hora_fim } = req.body;

      // --- LÓGICA DE NEGÓCIO: IMPEDIR DUPLICADAS (AO ATUALIZAR) ---
      const conflitos = await Reserva.verificarConflito(
        sala_id,
        data_hora_inicio,
        data_hora_fim,
        id // Ignora a própria reserva na checagem
      );

      if (conflitos > 0) {
        return res.status(409).json({
          error: "Conflito de horário",
          message: "Esta sala já está reservada para este período.",
        });
      }
      // --- FIM DA LÓGICA ---

      const reservaAtualizada = await Reserva.update(id, req.body);
      res.json(reservaAtualizada);
    } catch (error) {
      next(error);
    }
  },

  async excluirReserva(req, res, next) {
    try {
      await Reserva.delete(req.params.id);
      res.json({ message: "Reserva excluída (cancelada) com sucesso" });
    } catch (error) {
      next(error);
    }
  },
};
