import React from "react";

export function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  ...props
}) {
  const baseClasses = "btn";
  const variantClasses = {
    primary: "btn-primary",
    danger: "btn-danger",
    edit: "btn-edit",
    secondary: "btn-secondary",
  };

  const className = `${baseClasses} ${
    variantClasses[variant] || variantClasses.primary
  } ${props.className || ""}`;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
