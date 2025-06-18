const { body } = require('express-validator');

exports.validarMarcacao = [
  body('horario').notEmpty().withMessage('Horário é obrigatório no formato HH:MM')
];
