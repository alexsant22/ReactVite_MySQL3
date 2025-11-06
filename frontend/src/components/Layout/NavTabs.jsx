import React from "react";

export function NavTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "reservas", label: "Reservas" },
    { id: "salas", label: "Salas" },
    { id: "usuarios", label: "Usuários" },
  ];

  return (
    <div className="nav-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {/* Adicionando ícones para clareza */}
          <span>
            {tab.id === "reservas" && "📅 "}
            {tab.id === "salas" && "🏨 "}
            {tab.id === "usuarios" && "👥 "}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}
