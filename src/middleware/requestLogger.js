/**
 * Middleware para logging de requisições HTTP
 */

const logger = require('../utils/logger');

function requestLogger(req, res, next) {
  const start = Date.now();

  // Log quando a resposta terminar
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMessage = `${req.method} ${req.originalUrl} - Status: ${res.statusCode} - ${duration}ms`;

    if (res.statusCode >= 500) {
      logger.error(logMessage);
    } else if (res.statusCode >= 400) {
      logger.warn(logMessage);
    } else {
      logger.info(logMessage);
    }
  });

  next();
}

module.exports = requestLogger;
