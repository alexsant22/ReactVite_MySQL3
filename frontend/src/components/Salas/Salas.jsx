import React, { useState } from "react";
import { salasService } from "../../services/salasService";
import { Button } from "../UI/Button";
import { Alert } from "../UI/Alert";
import { SalaForm } from "./SalaForm";
import { SalaList } from "./SalaList";
import { useSalas } from "../../hooks/useSalas";
import { Loading } from "../Layout/Loading";

export function Salas() {
  const { salas, loading, error, recarregar } = useSalas();
  const [showForm, setShowForm] = useState(false);
  const [editingSala, setEditingSala] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    capacidade: "1",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (data) => {
    try {
      if (editingSala) {
        await salasService.atualizar(editingSala.id, data);
        setMessage("Sala atualizada com sucesso!");
      } else {
        await salasService.criar(data);
        setMessage("Sala criada com sucesso!");
      }

      resetForm();
      recarregar();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Erro ao salvar sala: " + error.message);
    }
  };

  const handleEdit = (sala) => {
    setEditingSala(sala);
    setFormData({
      nome: sala.nome,
      descricao: sala.descricao || "",
      capacidade: sala.capacidade ? sala.capacidade.toString() : "1",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta sala?")) {
      try {
        await salasService.excluir(id);
        setMessage("Sala excluída com sucesso!");
        recarregar();
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Erro ao excluir sala: " + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({ nome: "", descricao: "", capacidade: "1" });
    setEditingSala(null);
    setShowForm(false);
  };

  if (loading) {
    return <Loading message="Carregando salas..." />;
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
          <h2 className="card-title">Salas de Reunião</h2>
          <Button variant="primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancelar" : "Nova Sala"}
          </Button>
        </div>

        {showForm && (
          <SalaForm
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            isEditing={!!editingSala}
          />
        )}

        <SalaList salas={salas} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
