const db = require('../config/db');

exports.listar = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM consulta');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar consultas', message: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { data, medico, estado } = req.body;
    const result = await db.query(
      'INSERT INTO consulta (data, medico, estado) VALUES ($1, $2, $3) RETURNING *',
      [data, medico, estado || 'disponível']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar consulta', message: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data, medico, estado } = req.body;
    const result = await db.query(
      'UPDATE consulta SET data = $1, medico = $2, estado = $3 WHERE id = $4 RETURNING *',
      [data, medico, estado, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Consulta não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar consulta', message: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.query('DELETE FROM consulta WHERE id = $1', [id]);
    res.send('Consulta removida com sucesso');
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar consulta', message: err.message });
  }
};