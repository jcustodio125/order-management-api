/**
 * Ponto de Entrada da Aplicação
 */

const app = require('./src/app');
const { conectarBancoDados } = require('./src/database/connection');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    logger.info('Iniciando aplicação...');
    
    await conectarBancoDados();
    
    app.listen(PORT, () => {
      logger.info(`Servidor rodando na porta ${PORT}`);
      logger.info(`API disponível em http://localhost:${PORT}`);
    });
    
  } catch (erro) {
    logger.error('Erro ao iniciar servidor', { error: erro.message });
    process.exit(1);
  }
}

iniciarServidor();
