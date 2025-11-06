import { createDatabaseConnection } from "../config/database.js";

export class Reserva {
  /**
   * Busca todas as reservas, juntando os nomes da sala e do usuário.
   */
  static async findAll() {
    const connection = await createDatabaseConnection();
    const [rows] = await connection.execute(`
      SELECT 
        r.*, 
        s.nome as sala_nome, 
        u.nome as usuario_nome
      FROM reservas r
      LEFT JOIN salas s ON r.sala_id = s.id
      LEFT JOIN usuarios u ON r.usuario_id = u.id
      ORDER BY r.data_hora_inicio DESC
    `);
    await connection.end();
    return rows;
  }

  static async findById(id) {
    const connection = await createDatabaseConnection();
    const [rows] = await connection.execute(
      `
      SELECT 
        r.*, 
        s.nome as sala_nome, 
        u.nome as usuario_nome
      FROM reservas r
      LEFT JOIN salas s ON r.sala_id = s.id
      LEFT JOIN usuarios u ON r.usuario_id = u.id
      WHERE r.id = ?
    `,
      [id]
    );
    await connection.end();
    return rows[0];
  }

  /**
   * Verifica se existe uma reserva conflitante para uma determinada sala e período.
   * Retorna o número de conflitos encontrados.
   */
  static async verificarConflito(
    sala_id,
    data_hora_inicio,
    data_hora_fim,
    ignorarReservaId = null
  ) {
    const connection = await createDatabaseConnection();

    // Lógica: (InícioA < FimB) e (FimA > InícioB)
    // Se um período termina antes do outro começar (ou vice-versa), eles NÃO se sobrepõem.
    // Queremos encontrar onde ELES SE SOBREPÕEM.

    let query = `
      SELECT COUNT(*) as conflitos
      FROM reservas
      WHERE sala_id = ?
      AND (data_hora_inicio < ? AND data_hora_fim > ?)
    `;

    const params = [sala_id, data_hora_fim, data_hora_inicio];

    // Se estivermos atualizando, queremos ignorar a própria reserva
    // na verificação de conflito.
    if (ignorarReservaId) {
      query += " AND id != ?";
      params.push(ignorarReservaId);
    }

    const [rows] = await connection.execute(query, params);
    await connection.end();

    return rows[0].conflitos;
  }

  static async create(reservaData) {
    const { sala_id, usuario_id, titulo, data_hora_inicio, data_hora_fim } =
      reservaData;

    const connection = await createDatabaseConnection();
    const [result] = await connection.execute(
      "INSERT INTO reservas (sala_id, usuario_id, titulo, data_hora_inicio, data_hora_fim) VALUES (?, ?, ?, ?, ?)",
      [sala_id, usuario_id, titulo, data_hora_inicio, data_hora_fim]
    );
    await connection.end();
    return { id: result.insertId, ...reservaData };
  }

  static async update(id, reservaData) {
    const { sala_id, usuario_id, titulo, data_hora_inicio, data_hora_fim } =
      reservaData;

    const connection = await createDatabaseConnection();
    await connection.execute(
      "UPDATE reservas SET sala_id = ?, usuario_id = ?, titulo = ?, data_hora_inicio = ?, data_hora_fim = ? WHERE id = ?",
      [sala_id, usuario_id, titulo, data_hora_inicio, data_hora_fim, id]
    );
    await connection.end();
    return { id, ...reservaData };
  }

  static async delete(id) {
    const connection = await createDatabaseConnection();
    await connection.execute("DELETE FROM reservas WHERE id = ?", [id]);
    await connection.end();
    return true;
  }
}
