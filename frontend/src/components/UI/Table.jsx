import React from "react";

export function Table({
  headers,
  children,
  emptyMessage = "Nenhum registro encontrado",
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {React.Children.count(children) === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "#666",
            backgroundColor: "#f8fafc",
            borderRadius: "0 0 8px 8px",
          }}
        >
          {emptyMessage}
        </div>
      )}
    </div>
  );
}
