import React, { useState } from "react";
import { usuariosService } from "../../services/usuariosService";
import { Button } from "../UI/Button";
import { Alert } from "../UI/Alert";
import { UsuarioForm } from "./UsuarioForm";
import { UsuarioList } from "./UsuarioList";
import { useUsuarios } from "../../hooks/useUsuarios";
import { Loading } from "../Layout/Loading";

export function Usuarios() {
  const { usuarios, loading, error, recarregar } = useUsuarios();
  const [showForm, setShowForm] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (data) => {
    try {
      if (editingUsuario) {
        await usuariosService.atualizar(editingUsuario.id, data);
        setMessage("Usuário atualizado com sucesso!");
      } else {
        await usuariosService.criar(data);
        setMessage("Usuário criado com sucesso!");
      }

      resetForm();
      recarregar();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Erro ao salvar usuário: " + error.message);
    }
  };

  const handleEdit = (usuario) => {
    setEditingUsuario(usuario);
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await usuariosService.excluir(id);
        setMessage("Usuário excluído com sucesso!");
        recarregar();
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Erro ao excluir usuário: " + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({ nome: "", email: "" });
    setEditingUsuario(null);
    setShowForm(false);
  };

  if (loading) {
    return <Loading message="Carregando usuários..." />;
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
          <h2 className="card-title">Usuários</h2>
          <Button variant="primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancelar" : "Novo Usuário"}
          </Button>
        </div>

        {showForm && (
          <UsuarioForm
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            isEditing={!!editingUsuario}
          />
        )}

        <UsuarioList
          usuarios={usuarios}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
