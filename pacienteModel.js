// src/models/pacienteModel.js
class PacientesModel {
  static async getTodos() {
    const result = await db.query('SELECT * FROM paciente');
    return result.rows;
  }

  static async criar(nome, telefone) {
    const result = await db.query(
      'INSERT INTO paciente (nome, telefone) VALUES ($1, $2) RETURNING *',
      [nome, telefone]
    );
    return result.rows[0];
  }

  static async atualizar(id, nome, telefone) {
    const result = await db.query(
      'UPDATE paciente SET nome = $1, telefone = $2 WHERE id = $3 RETURNING *',
      [nome, telefone, id]
    );
    return result.rows[0];
  }

  static async deletar(id) {
    await db.query('DELETE FROM paciente WHERE id = $1', [id]);
  }
}

module.exports = PacientesModel;
