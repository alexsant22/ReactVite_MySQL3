export function errorHandler(err, req, res, next) {
  console.error("Erro:", err);

  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    return res.status(400).json({
      error: "Categoria não encontrada",
    });
  }

  res.status(500).json({
    error: "Erro interno do servidor",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
}
