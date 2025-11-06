import React from "react";
import { Button } from "../UI/Button";

export function UsuarioList({ usuarios, onEdit, onDelete }) {
  if (usuarios.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">👥</div>
        <h3>Nenhum usuário cadastrado</h3>
        <p>Comece criando seu primeiro usuário</p>
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
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>
                <span className="badge badge-secondary">#{usuario.id}</span>
              </td>
              <td>
                <strong>{usuario.nome}</strong>
              </td>
              <td>{usuario.email}</td>
              <td className="actions">
                <Button variant="edit" onClick={() => onEdit(usuario)}>
                  ✏️ Editar
                </Button>
                <Button variant="danger" onClick={() => onDelete(usuario.id)}>
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
