import React from "react";
import { Button } from "../UI/Button";

export function SalaList({ salas, onEdit, onDelete }) {
  if (salas.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🏨</div>
        <h3>Nenhuma sala cadastrada</h3>
        <p>Comece criando sua primeira sala</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Capacidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {salas.map((sala) => (
            <tr key={sala.id}>
              <td>
                <span className="badge badge-secondary">#{sala.id}</span>
              </td>
              <td>
                <strong>{sala.nome}</strong>
              </td>
              <td>{sala.descricao || "-"}</td>
              <td>{sala.capacidade || 1} pessoa(s)</td>
              <td className="actions">
                <Button variant="edit" onClick={() => onEdit(sala)}>
                  ✏️ Editar
                </Button>
                <Button variant="danger" onClick={() => onDelete(sala.id)}>
                  🗑️ Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
