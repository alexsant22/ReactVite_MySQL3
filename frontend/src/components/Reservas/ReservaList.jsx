import React from "react";
import { Button } from "../UI/Button";

export function ReservaList({ reservas, onEdit, onDelete }) {
  if (reservas.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📅</div>
        <h3>Nenhuma reserva encontrada</h3>
        <p>Seja o primeiro a reservar uma sala</p>
      </div>
    );
  }

  // Helper para formatar a data
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "-";
    const date = new Date(dateTimeString);
    return date.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Sala</th>
            <th>Usuário</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>
                <strong>{reserva.titulo}</strong>
              </td>
              <td>
                <span className="category-badge">{reserva.sala_nome}</span>
              </td>
              <td>{reserva.usuario_nome || "-"}</td>
              <td>{formatDateTime(reserva.data_hora_inicio)}</td>
              <td>{formatDateTime(reserva.data_hora_fim)}</td>
              <td className="actions">
                <Button variant="edit" onClick={() => onEdit(reserva)}>
                  ✏️ Editar
                </Button>
                <Button variant="danger" onClick={() => onDelete(reserva.id)}>
                  🗑️ Cancelar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
