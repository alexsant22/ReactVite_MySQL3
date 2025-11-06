import React from "react";
import { Button } from "../UI/Button";

export function ReservaForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  salas = [],
  usuarios = [],
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    if (
      !formData.sala_id ||
      !formData.usuario_id ||
      !formData.data_hora_inicio ||
      !formData.data_hora_fim
    ) {
      alert("Sala, Usuário, Data de Início e Fim são obrigatórios");
      return;
    }

    if (formData.data_hora_fim <= formData.data_hora_inicio) {
      alert("A data de fim deve ser posterior à data de início");
      return;
    }

    const data = {
      ...formData,
      sala_id: parseInt(formData.sala_id),
      usuario_id: parseInt(formData.usuario_id),
      // As datas já estão no formato DATETIME do formulário
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>{isEditing ? "Editar" : "Nova"} Reserva</h3>

      <div className="form-group">
        <label className="form-label">Título/Evento *</label>
        <input
          type="text"
          className="form-input"
          value={formData.titulo}
          onChange={(e) => onChange({ ...formData, titulo: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Sala *</label>
        <select
          className="form-select"
          value={formData.sala_id || ""}
          onChange={(e) => onChange({ ...formData, sala_id: e.target.value })}
          required
        >
          <option value="">Selecione uma sala</option>
          {salas.map((sala) => (
            <option key={sala.id} value={sala.id}>
              {sala.nome} (Capacidade: {sala.capacidade})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Usuário (Responsável) *</label>
        <select
          className="form-select"
          value={formData.usuario_id || ""}
          onChange={(e) =>
            onChange({ ...formData, usuario_id: e.target.value })
          }
          required
        >
          <option value="">Selecione um usuário</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome} ({usuario.email})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Início *</label>
        <input
          type="datetime-local"
          className="form-input"
          value={formData.data_hora_inicio}
          onChange={(e) =>
            onChange({ ...formData, data_hora_inicio: e.target.value })
          }
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Fim *</label>
        <input
          type="datetime-local"
          className="form-input"
          value={formData.data_hora_fim}
          onChange={(e) =>
            onChange({ ...formData, data_hora_fim: e.target.value })
          }
          required
        />
      </div>

      <div className="actions">
        <Button type="submit" variant="primary">
          {isEditing ? "Atualizar" : "Criar"} Reserva
        </Button>
        <Button type="button" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
