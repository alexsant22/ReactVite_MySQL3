import React from "react";
import { Button } from "../UI/Button";

export function UsuarioForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>{isEditing ? "Editar" : "Novo"} Usuário</h3>

      <div className="form-group">
        <label className="form-label">Nome *</label>
        <input
          type="text"
          className="form-input"
          value={formData.nome}
          onChange={(e) => onChange({ ...formData, nome: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Email *</label>
        <input
          type="email"
          className="form-input"
          value={formData.email}
          onChange={(e) => onChange({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="actions">
        <Button type="submit" variant="primary">
          {isEditing ? "Atualizar" : "Criar"} Usuário
        </Button>
        <Button type="button" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
