/**
 * Classes de erro customizadas para a Order Management API
 * Cada classe representa um tipo específico de erro com código HTTP apropriado
 */

/**
 * Erro de validação de dados
 * Usado quando os dados de entrada não atendem aos critérios de validação
 */
class ValidationError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

/**
 * Erro de recurso não encontrado
 * Usado quando um pedido solicitado não existe no banco de dados
 */
class NotFoundError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

/**
 * Erro de conflito
 * Usado quando há tentativa de criar um pedido com numeroPedido duplicado
 */
class ConflictError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}

/**
 * Erro de banco de dados
 * Usado quando há falha na conexão ou operação com o banco de dados
 */
class DatabaseError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'DatabaseError';
    this.statusCode = 503;
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
  ConflictError,
  DatabaseError
};
