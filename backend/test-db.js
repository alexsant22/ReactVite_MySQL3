import { createConnection, initializeDatabase } from "./src/config/database.js";

async function testDatabase() {
  try {
    console.log("🧪 Testando conexão com MySQL...");
    const connection = await createConnection();
    console.log("✅ Conexão com MySQL OK!");
    await connection.end();

    console.log("🧪 Testando criação do banco...");
    await initializeDatabase();
    console.log("✅ Banco de dados criado com sucesso!");

    console.log("🎉 Todos os testes passaram!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro no teste:", error.message);
    process.exit(1);
  }
}

testDatabase();
