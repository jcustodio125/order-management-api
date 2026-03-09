/**
 * OrderService - Lógica de negócio para gerenciamento de pedidos
 */

const { ValidationError, NotFoundError, ConflictError } = require('../middleware/errors');
const orderMapper = require('../mappers/orderMapper');
const repository = require('../database/mongoRepository');

/**
 * Valida dados de entrada do pedido
 */
function validarDadosPedido(dados) {
  if (!dados.numeroPedido || typeof dados.numeroPedido !== 'string' || dados.numeroPedido.trim() === '') {
    throw new ValidationError('numeroPedido deve ser uma string não vazia');
  }

  if (typeof dados.valorTotal !== 'number' || dados.valorTotal <= 0) {
    throw new ValidationError('valorTotal deve ser um número positivo');
  }

  if (!dados.dataCriacao || typeof dados.dataCriacao !== 'string') {
    throw new ValidationError('dataCriacao deve ser uma string válida');
  }

  const data = new Date(dados.dataCriacao);
  if (isNaN(data.getTime())) {
    throw new ValidationError('dataCriacao deve estar no formato ISO 8601 válido');
  }

  if (!Array.isArray(dados.items) || dados.items.length === 0) {
    throw new ValidationError('items deve ser um array não vazio');
  }

  dados.items.forEach((item, index) => {
    if (!item.idItem || typeof item.idItem !== 'string' || item.idItem.trim() === '') {
      throw new ValidationError(`items[${index}].idItem deve ser uma string não vazia`);
    }

    if (typeof item.quantidadeItem !== 'number' || item.quantidadeItem <= 0 || !Number.isInteger(item.quantidadeItem)) {
      throw new ValidationError(`items[${index}].quantidadeItem deve ser um número inteiro positivo`);
    }

    if (typeof item.valorItem !== 'number' || item.valorItem <= 0) {
      throw new ValidationError(`items[${index}].valorItem deve ser um número positivo`);
    }
  });
}

/**
 * Cria um novo pedido
 */
async function criarPedido(dadosEntrada) {
  validarDadosPedido(dadosEntrada);

  const orderId = orderMapper.extrairOrderId(dadosEntrada.numeroPedido);

  const pedidoExistente = await repository.buscarPorOrderId(orderId);
  if (pedidoExistente) {
    throw new ConflictError(`Pedido com numeroPedido '${dadosEntrada.numeroPedido}' já existe`);
  }

  const dadosTransformados = orderMapper.transformarParaSaida(dadosEntrada);
  const pedidoCriado = await repository.salvar(dadosTransformados);

  return pedidoCriado;
}

/**
 * Obtém um pedido específico
 */
async function obterPedido(numeroPedido) {
  const orderId = orderMapper.extrairOrderId(numeroPedido);
  const pedido = await repository.buscarPorOrderId(orderId);

  if (!pedido) {
    throw new NotFoundError(`Pedido com numeroPedido '${numeroPedido}' não encontrado`);
  }

  return pedido;
}

/**
 * Lista todos os pedidos
 */
async function listarPedidos() {
  return await repository.listarTodos();
}

/**
 * Atualiza um pedido existente
 */
async function atualizarPedido(numeroPedido, dadosEntrada) {
  validarDadosPedido(dadosEntrada);

  const orderId = orderMapper.extrairOrderId(numeroPedido);

  const pedidoExistente = await repository.buscarPorOrderId(orderId);
  if (!pedidoExistente) {
    throw new NotFoundError(`Pedido com numeroPedido '${numeroPedido}' não encontrado`);
  }

  const dadosTransformados = orderMapper.transformarParaSaida(dadosEntrada);
  const pedidoAtualizado = await repository.atualizar(orderId, dadosTransformados);

  return pedidoAtualizado;
}

/**
 * Deleta um pedido
 */
async function deletarPedido(numeroPedido) {
  const orderId = orderMapper.extrairOrderId(numeroPedido);

  const pedidoExistente = await repository.buscarPorOrderId(orderId);
  if (!pedidoExistente) {
    throw new NotFoundError(`Pedido com numeroPedido '${numeroPedido}' não encontrado`);
  }

  await repository.deletar(orderId);
}

module.exports = {
  criarPedido,
  obterPedido,
  listarPedidos,
  atualizarPedido,
  deletarPedido
};
