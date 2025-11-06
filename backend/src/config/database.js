import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root", // Deixe vazio se não tem senha
  database: "crud_system",
  port: 3306,
};

export async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port,
    });
    console.log("✅ Conectado ao MySQL");
    return connection;
  } catch (error) {
    console.error("❌ Erro ao conectar com o MySQL:", error.message);
    throw error;
  }
}

export async function createDatabaseConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("✅ Conectado ao banco crud_system");
    return connection;
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco:", error.message);
    throw error;
  }
}

export async function initializeDatabase() {
  let connection;
  try {
    connection = await createConnection();

    console.log("🔄 Criando banco de dados...");
    await connection.query("CREATE DATABASE IF NOT EXISTS crud_system");
    await connection.query("USE crud_system");
    console.log("✅ Banco de dados criado/verificado");

    console.log("🔄 Criando tabela de usuarios...");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Tabela usuarios criada/verificada");

    console.log("🔄 Criando tabela de salas...");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS salas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        descricao TEXT,
        capacidade INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Tabela salas criada/verificada");

    console.log("🔄 Criando tabela de reservas...");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS reservas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sala_id INT NOT NULL,
        usuario_id INT NOT NULL,
        titulo VARCHAR(255) NOT NULL,
        data_hora_inicio DATETIME NOT NULL,
        data_hora_fim DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sala_id) REFERENCES salas(id) ON DELETE CASCADE,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
        INDEX idx_sala_horario (sala_id, data_hora_inicio, data_hora_fim)
      )
    `);
    console.log("✅ Tabela reservas criada/verificada");

    await connection.end();
    console.log("🎉 Banco de dados totalmente inicializado!");
  } catch (error) {
    console.error("❌ Erro ao inicializar banco de dados:", error.message);
    if (connection) {
      await connection.end();
    }
    throw error;
  }
}
