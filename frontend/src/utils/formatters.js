export const formatadores = {
  preco(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor || 0);
  },

  data(data) {
    return new Date(data).toLocaleDateString("pt-BR");
  },

  textoLimitado(texto, limite = 50) {
    if (!texto) return "-";
    return texto.length > limite ? texto.substring(0, limite) + "..." : texto;
  },
};
