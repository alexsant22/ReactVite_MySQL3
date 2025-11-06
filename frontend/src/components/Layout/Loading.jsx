import React from "react";

export function Loading({ message = "Carregando..." }) {
  return (
    <div className="loading">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div className="loading-spinner"></div>
        <p style={{ margin: 0, color: "var(--primary)", fontSize: "1.1rem" }}>
          {message}
        </p>
      </div>
    </div>
  );
}
