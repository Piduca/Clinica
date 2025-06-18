const db = require('../config/db');

exports.listarMarcacoes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM marcacao');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar marcações', message: err.message });
  }
};

exports.marcarConsulta = async (req, res) => {
  try {
    const { paciente_id, consulta_id, horario } = req.body;

    const conflito = await db.query(
      'SELECT * FROM marcacao WHERE horario = $1',
      [horario]
    );
    if (conflito.rows.length > 0) {
      return res.status(400).json({ error: 'Já existe uma marcação para esse horário' });
    }

    await db.query(
      'INSERT INTO marcacao (paciente_id, consulta_id, estado, horario) VALUES ($1, $2, $3, $4)',
      [paciente_id, consulta_id, 'marcado', horario]
    );
    await db.query(
      'UPDATE consulta SET estado = $1 WHERE id = $2',
      ['marcado', consulta_id]
    );
    res.status(201).json({ mensagem: 'Consulta marcada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao marcar consulta', message: err.message });
  }
};

exports.atualizarEstado = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { estado } = req.body;
    await db.query('UPDATE marcacao SET estado = $1 WHERE id = $2', [estado, id]);
    res.json({ mensagem: 'Estado da marcação atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar estado', message: err.message });
  }
};

exports.cancelarMarcacao = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.query('DELETE FROM marcacao WHERE id = $1', [id]);
    res.json({ mensagem: 'Marcação cancelada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cancelar marcação', message: err.message });
  }
};
