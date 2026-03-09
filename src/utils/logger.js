/**
 * Sistema de Logs com Winston
 * Logs estruturados com timestamp, níveis e formatação profissional
 */

const winston = require('winston');
const path = require('path');

// Formato customizado para logs
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    const log = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    return stack ? `${log}\n${stack}` : log;
  })
);

// Configuração do logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    // Console (desenvolvimento)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    }),
    // Arquivo de logs gerais
    new winston.transports.File({
      filename: path.join('logs', 'app.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // Arquivo de erros
    new winston.transports.File({
      filename: path.join('logs', 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

module.exports = logger;
