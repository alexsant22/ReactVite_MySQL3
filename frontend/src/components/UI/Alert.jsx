import React from "react";

export function Alert({ type = "success", message, onClose }) {
  if (!message) return null;

  const alertClasses = `alert alert-${type}`;

  return (
    <div className={alertClasses}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            float: "right",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
