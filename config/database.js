/**
 * Configuração de Banco de Dados
 */

require('dotenv').config();

const config = {
  // Porta do servidor
  port: process.env.PORT || 3000,

  // Configurações MongoDB
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/order-management'
  }
};

module.exports = config;
