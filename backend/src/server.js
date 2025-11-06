import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { initializeDatabase } from "./config/database.js";

const app = express();
const PORT = 3001;

// CORS configurado para aceitar qualquer origem em desenvolvimento
app.use(
  cors({
    origin: true, // Aceita qualquer origem
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Ou ainda mais simples:
// app.use(cors());

app.use(express.json());

// Log middleware para debug
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${
      req.headers.origin
    }`
  );
  next();
});

// Inicializar banco de dados quando o servidor iniciar
async function startServer() {
  try {
    console.log("🔄 Inicializando banco de dados...");
    await initializeDatabase();
    console.log("✅ Banco de dados inicializado com sucesso!");

    // Routes
    app.use("/api", routes);

    // Rota de health check
    app.get("/health", (req, res) => {
      res.json({
        status: "OK",
        message: "Server is running",
        timestamp: new Date().toISOString(),
      });
    });

    // Rota para forçar criação do banco
    app.get("/init-db", async (req, res) => {
      try {
        await initializeDatabase();
        res.json({ message: "Banco de dados inicializado com sucesso!" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Error handling
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 API: http://localhost:${PORT}/api`);
      console.log(`🔗 Frontend: http://localhost:5173`);
      console.log(`🌐 CORS: Habilitado para todas as origens`);
    });
  } catch (error) {
    console.error("❌ Erro ao inicializar servidor:", error.message);
    process.exit(1);
  }
}

startServer();
