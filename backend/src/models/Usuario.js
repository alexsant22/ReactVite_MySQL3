import { createDatabaseConnection } from "../config/database.js";

export class Usuario {
  // <-- AQUI ESTÁ O EXPORT!
  static async findAll() {
    const connection = await createDatabaseConnection();
    // Omitindo a senha, se houver, é uma boa prática, mas aqui manteremos simples
    const [rows] = await connection.execute(
      "SELECT id, nome, email FROM usuarios"
    );
    await connection.end();
    return rows;
  }

  static async findById(id) {
    const connection = await createDatabaseConnection();
    const [rows] = await connection.execute(
      "SELECT id, nome, email FROM usuarios WHERE id = ?",
      [id]
    );
    await connection.end();
    return rows[0];
  }

  static async create(usuarioData) {
    const { nome, email } = usuarioData;
    const connection = await createDatabaseConnection();
    const [result] = await connection.execute(
      "INSERT INTO usuarios (nome, email) VALUES (?, ?)",
      [nome, email]
    );
    await connection.end();
    return { id: result.insertId, ...usuarioData };
  }

  static async update(id, usuarioData) {
    const { nome, email } = usuarioData;
    const connection = await createDatabaseConnection();
    await connection.execute(
      "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?",
      [nome, email, id]
    );
    await connection.end();
    return { id, ...usuarioData };
  }

  static async delete(id) {
    const connection = await createDatabaseConnection();
    // Cuidado: Em um app real, você não deve excluir usuários que tenham reservas.
    // Aqui, estamos simplificando. O ON DELETE CASCADE no banco já cuidaria disso.
    await connection.execute("DELETE FROM usuarios WHERE id = ?", [id]);
    await connection.end();
    return true;
  }
}
