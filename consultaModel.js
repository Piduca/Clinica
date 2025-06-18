const db = require('../config/db');

class ConsultasModel {
  static async getTodas() {
    const result = await db.query('SELECT * FROM consulta');
    return result.rows;
  }

  static async criar(data, medico, estado = 'disponível') {
    const result = await db.query(
      'INSERT INTO consulta (data, medico, estado) VALUES ($1, $2, $3) RETURNING *',
      [data, medico, estado]
    );
    return result.rows[0];
  }

  static async atualizar(id, data, medico, estado) {
    const result = await db.query(
      'UPDATE consulta SET data = $1, medico = $2, estado = $3 WHERE id = $4 RETURNING *',
      [data, medico, estado, id]
    );
    return result.rows[0];
  }

  static async deletar(id) {
    await db.query('DELETE FROM consulta WHERE id = $1', [id]);
  }
}

module.exports = ConsultasModel;