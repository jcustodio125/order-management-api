/**
 * Módulo de Conexão com MongoDB
 */

const mongoose = require('mongoose');
const config = require('../../config/database');
const logger = require('../utils/logger');

async function conectarBancoDados() {
  try {
    logger.info('Conectando ao MongoDB...');
    
    await mongoose.connect(config.mongodb.uri);
    
    logger.info(`Conectado ao MongoDB: ${config.mongodb.uri.replace(/\/\/.*@/, '//<credentials>@')}`);
    
    mongoose.connection.on('error', (erro) => {
      logger.error('Erro na conexão MongoDB', { error: erro.message });
    });
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB desconectado');
    });
    
    return mongoose.connection;
    
  } catch (erro) {
    logger.error('Erro ao conectar ao MongoDB', { error: erro.message });
    throw erro;
  }
}

async function desconectarBancoDados() {
  try {
    await mongoose.connection.close();
    logger.info('Conexão MongoDB fechada');
  } catch (erro) {
    logger.error('Erro ao desconectar', { error: erro.message });
    throw erro;
  }
}

module.exports = {
  conectarBancoDados,
  desconectarBancoDados
};
