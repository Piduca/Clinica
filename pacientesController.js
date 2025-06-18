const db = require('../config/db');

exports.listar = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM paciente');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pacientes', message: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, telefone } = req.body;
    const result = await db.query(
      'INSERT INTO paciente (nome, telefone) VALUES ($1, $2) RETURNING *',
      [nome, telefone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar paciente', message: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, telefone } = req.body;
    const result = await db.query(
      'UPDATE paciente SET nome = $1, telefone = $2 WHERE id = $3 RETURNING *',
      [nome, telefone, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar paciente', message: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.query('DELETE FROM paciente WHERE id = $1', [id]);
    res.send('Paciente removido com sucesso');
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar paciente', message: err.message });
  }
};