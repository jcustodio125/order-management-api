/**
 * Middleware de tratamento centralizado de erros
 */

const logger = require('../utils/logger');

function errorHandler(erro, req, res, next) {
  // Log do erro com stack trace
  logger.error(`${erro.name}: ${erro.message}`, { 
    stack: erro.stack,
    path: req.path,
    method: req.method
  });

  // Determina status code
  const statusCode = erro.statusCode || 500;
  
  // Mensagem de erro em português
  const mensagem = erro.statusCode 
    ? erro.message 
    : 'Erro interno do servidor';

  // Resposta JSON
  res.status(statusCode).json({
    erro: mensagem,
    tipo: erro.name || 'InternalError'
  });
}

module.exports = errorHandler;
