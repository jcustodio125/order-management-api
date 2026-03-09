/**
 * Configuração da Aplicação Express
 */

const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Middleware de logging de requisições
app.use(requestLogger);

// Registrar rotas
app.use('/', orderRoutes);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

module.exports = app;
