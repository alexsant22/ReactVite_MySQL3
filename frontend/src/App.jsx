import React, { useState } from "react";
import { Header } from "./components/Layout/Header";
import { NavTabs } from "./components/Layout/NavTabs";
import { Loading } from "./components/Layout/Loading";
import { Salas } from "./components/Salas/Salas";
import { Usuarios } from "./components/Usuarios/Usuarios";
import { Reservas } from "./components/Reservas/Reservas";

function App() {
  // Define "Reservas" como a aba padrão
  const [activeTab, setActiveTab] = useState("reservas");

  return (
    <div>
      <Header />

      <div className="container">
        <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* --- Renderização Condicional das Telas --- */}

        {/* Funcionalidade Principal (Nova) */}
        {activeTab === "reservas" && <Reservas />}
        {activeTab === "salas" && <Salas />}
        {activeTab === "usuarios" && <Usuarios />}
      </div>
    </div>
  );
}

export default App;
