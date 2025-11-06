import React from "react";
import { Button } from "../UI/Button";

export function SalaForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      capacidade: parseInt(formData.capacidade) || 1, // Garante que é um número
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>{isEditing ? "Editar" : "Nova"} Sala</h3>

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
        <label className="form-label">Descrição</label>
        <textarea
          className="form-textarea"
          value={formData.descricao}
          onChange={(e) => onChange({ ...formData, descricao: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Capacidade *</label>
        <input
          type="number"
          min="1"
          className="form-input"
          value={formData.capacidade}
          onChange={(e) =>
            onChange({ ...formData, capacidade: e.target.value })
          }
          required
        />
      </div>

      <div className="actions">
        <Button type="submit" variant="primary">
          {isEditing ? "Atualizar" : "Criar"} Sala
        </Button>
        <Button type="button" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
