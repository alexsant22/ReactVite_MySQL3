import axios from "axios";

// O Vite usa a porta 5173 por padrão
const API_BASE = "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => {
    console.log(
      `✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${
        response.status
      }`
    );
    return response;
  },
  (error) => {
    console.error("❌ API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
    });

    if (error.response?.status === 500) {
      console.error(
        "💥 Erro interno do servidor - verifique o terminal do backend"
      );
    }

    throw error;
  }
);
