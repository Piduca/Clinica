const { body } = require('express-validator');

exports.validarConsulta = [
  body('data').notEmpty().withMessage('Data é obrigatória'),
  body('medico').notEmpty().withMessage('Médico é obrigatório'),
  body('estado').optional().isIn(['disponível', 'marcado', 'realizada', 'cancelada'])
    .withMessage('Estado inválido')
];
