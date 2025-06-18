require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const authMiddleware = require("./middlewares/authMiddleware");

app.use(cors());

const pacientesRoutes = require('./routes/pacientesRoutes');
const consultasRoutes = require('./routes/consultasRoutes');
const marcacoesRoutes = require('./routes/marcacoesRoutes');

app.use(express.json());

app.use('/pacientes', pacientesRoutes);
app.use('/consultas', consultasRoutes);
app.use('/marcacoes', marcacoesRoutes);

app.get('/', (req, res) => {
  res.send('API Clínica em ação!');
});

module.exports = app;