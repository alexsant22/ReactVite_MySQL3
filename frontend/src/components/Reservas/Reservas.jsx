import React, { useState } from "react";
import { reservasService } from "../../services/reservasService";
import { Button } from "../UI/Button";
import { Alert } from "../UI/Alert";
import { ReservaForm } from "./ReservaForm";
import { ReservaList } from "./ReservaList";
import { useReservas } from "../../hooks/useReservas";
import { useSalas } from "../../hooks/useSalas";
import { useUsuarios } from "../../hooks/useUsuarios";
import { Loading } from "../Layout/Loading";

const estadoInicialForm = {
  titulo: "",
  sala_id: "",
  usuario_id: "",
  data_hora_inicio: "",
  data_hora_fim: "",
};

// Helper para formatar data/hora (do DB) para o input datetime-local
// O formato do input é 'YYYY-MM-DDTHH:mm'
const formatDateTimeForInput = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  // Pega a data e hora locais e remove os segundos e timezone
  return date.toISOString().slice(0, 16);
};

export function Reservas() {
  // --- Hooks de dados ---
  const {
    reservas,
    loading: loadingReservas,
    recarregar: recarregarReservas,
  } = useReservas();
  const { salas, loading: loadingSalas } = useSalas();
  const { usuarios, loading: loadingUsuarios } = useUsuarios();

  // --- Hooks de estado ---
  const [showForm, setShowForm] = useState(false);
  const [editingReserva, setEditingReserva] = useState(null);
  const [formData, setFormData] = useState(estadoInicialForm);
  const [message, setMessage] = useState("");

  const handleSubmit = async (data) => {
    try {
      if (editingReserva) {
        await reservasService.atualizar(editingReserva.id, data);
        setMessage("Reserva atualizada com sucesso!");
      } else {
        await reservasService.criar(data);
        setMessage("Reserva criada com sucesso!");
      }

      resetForm();
      recarregarReservas();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      // TRATAMENTO DE ERRO DE CONFLITO
      if (error.response && error.response.status === 409) {
        setMessage("Erro: " + error.response.data.message);
      } else {
        setMessage("Erro ao salvar reserva: " + error.message);
      }
    }
  };

  const handleEdit = (reserva) => {
    setEditingReserva(reserva);
    setFormData({
      titulo: reserva.titulo,
      sala_id: reserva.sala_id,
      usuario_id: reserva.usuario_id,
      data_hora_inicio: formatDateTimeForInput(reserva.data_hora_inicio),
      data_hora_fim: formatDateTimeForInput(reserva.data_hora_fim),
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja cancelar esta reserva?")) {
      try {
        await reservasService.excluir(id);
        setMessage("Reserva cancelada com sucesso!");
        recarregarReservas();
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Erro ao cancelar reserva: " + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData(estadoInicialForm);
    setEditingReserva(null);
    setShowForm(false);
  };

  // Mostra o loading se QUALQUER um dos hooks estiver carregando
  if (loadingReservas || loadingSalas || loadingUsuarios) {
    return <Loading message="Carregando dados..." />;
  }

  return (
    <div>
      <Alert
        message={message}
        type={message.includes("Erro") ? "error" : "success"}
        onClose={() => setMessage("")}
      />

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Reservas de Salas</h2>
          <Button variant="primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancelar" : "Nova Reserva"}
          </Button>
        </div>

        {showForm && (
          <ReservaForm
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            isEditing={!!editingReserva}
            salas={salas}
            usuarios={usuarios}
          />
        )}

        <ReservaList
          reservas={reservas}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
