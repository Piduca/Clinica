const express = require('express');
const router = express.Router();
const controller = require('../controllers/consultasController');
const { validarConsulta } = require('../middlewares/consultaValidation');
const { validationResult } = require('express-validator');

router.get('/', controller.listar);

router.post('/', validarConsulta, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ erros: errors.array() });
  next();
}, controller.criar);

router.put('/:id', validarConsulta, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ erros: errors.array() });
  next();
}, controller.atualizar);

router.delete('/:id', controller.deletar);

module.exports = router;
