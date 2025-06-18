const express = require('express');
const router = express.Router();
const controller = require('../controllers/marcacoesController');
const { validarMarcacao } = require('../middlewares/marcacaoValidation.js');
const { validationResult } = require('express-validator');

router.get('/', controller.listarMarcacoes);

router.post('/', validarMarcacao, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ erros: errors.array() });
  next();
}, controller.marcarConsulta);

router.put('/:id', (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ erros: errors.array() });
  next();
}, controller.atualizarEstado);

router.delete('/:id', controller.cancelarMarcacao);

module.exports = router;
