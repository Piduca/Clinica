const { body } = require('express-validator');

exports.validarPaciente = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('telefone').notEmpty().withMessage('Telefone é obrigatório')
];