import { createDatabaseConnection } from "../config/database.js";

export class Sala {
  static async findAll() {
    const connection = await createDatabaseConnection();
    const [rows] = await connection.execute("SELECT * FROM salas");
    await connection.end();
    return rows;
  }

  static async findById(id) {
    const connection = await createDatabaseConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM salas WHERE id = ?",
      [id]
    );
    await connection.end();
    return rows[0];
  }

  static async create(salaData) {
    const { nome, descricao, capacidade } = salaData;
    const connection = await createDatabaseConnection();
    const [result] = await connection.execute(
      "INSERT INTO salas (nome, descricao, capacidade) VALUES (?, ?, ?)",
      [nome, descricao, capacidade || 1]
    );
    await connection.end();
    return { id: result.insertId, ...salaData };
  }

  static async update(id, salaData) {
    const { nome, descricao, capacidade } = salaData;
    const connection = await createDatabaseConnection();
    await connection.execute(
      "UPDATE salas SET nome = ?, descricao = ?, capacidade = ? WHERE id = ?",
      [nome, descricao, capacidade || 1, id]
    );
    await connection.end();
    return { id, ...salaData };
  }

  static async delete(id) {
    const connection = await createDatabaseConnection();
    await connection.execute("DELETE FROM salas WHERE id = ?", [id]);
    await connection.end();
    return true;
  }
}
