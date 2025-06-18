const db = require('../config/db');

class MarcacoesModel {
  static async getTodas() {
    const result = await db.query('SELECT * FROM marcacao');
    return result.rows;
  }

  static async marcar(paciente_id, consulta_id, horario) {
    const conflito = await db.query(
      'SELECT * FROM marcacao WHERE horario = $1',
      [horario]
    );
    if (conflito.rows.length > 0) {
      throw new Error('Já existe uma marcação para esse horário');
    }

    await db.query(
      'INSERT INTO marcacao (paciente_id, consulta_id, estado, horario) VALUES ($1, $2, $3, $4)',
      [paciente_id, consulta_id, 'marcado', horario]
    );
    await db.query('UPDATE consulta SET estado = $1 WHERE id = $2', ['marcado', consulta_id]);
  }

  static async atualizarEstado(id, estado) {
    await db.query('UPDATE marcacao SET estado = $1 WHERE id = $2', [estado, id]);
  }

  static async cancelar(id) {
    await db.query('DELETE FROM marcacao WHERE id = $1', [id]);
  }
}

module.exports = MarcacoesModel;