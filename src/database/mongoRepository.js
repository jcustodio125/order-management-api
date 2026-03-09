/**
 * Funções para operações no MongoDB usando Mongoose
 */

const Order = require('./orderModel');
const { ConflictError, NotFoundError, DatabaseError } = require('../middleware/errors');

/**
 * Salva um novo pedido no banco de dados
 */
async function salvar(pedido) {
  try {
    const novoPedido = new Order(pedido);
    const pedidoSalvo = await novoPedido.save();
    return pedidoSalvo.toObject();
  } catch (erro) {
    if (erro.code === 11000) {
      throw new ConflictError(`Pedido com orderId '${pedido.orderId}' já existe`);
    }
    throw new DatabaseError(`Erro ao salvar pedido: ${erro.message}`);
  }
}

/**
 * Busca um pedido por orderId
 */
async function buscarPorOrderId(orderId) {
  try {
    return await Order.findOne({ orderId }).lean();
  } catch (erro) {
    throw new DatabaseError(`Erro ao buscar pedido: ${erro.message}`);
  }
}

/**
 * Lista todos os pedidos do banco de dados
 */
async function listarTodos() {
  try {
    return await Order.find({}).lean();
  } catch (erro) {
    throw new DatabaseError(`Erro ao listar pedidos: ${erro.message}`);
  }
}

/**
 * Atualiza um pedido existente
 */
async function atualizar(orderId, pedido) {
  try {
    const pedidoAtualizado = await Order.findOneAndReplace(
      { orderId },
      pedido,
      { new: true, lean: true }
    );

    if (!pedidoAtualizado) {
      throw new NotFoundError(`Pedido com orderId '${orderId}' não encontrado`);
    }

    return pedidoAtualizado;
  } catch (erro) {
    if (erro instanceof NotFoundError) throw erro;
    throw new DatabaseError(`Erro ao atualizar pedido: ${erro.message}`);
  }
}

/**
 * Deleta um pedido do banco de dados
 */
async function deletar(orderId) {
  try {
    const resultado = await Order.deleteOne({ orderId });
    return resultado.deletedCount > 0;
  } catch (erro) {
    throw new DatabaseError(`Erro ao deletar pedido: ${erro.message}`);
  }
}

module.exports = {
  salvar,
  buscarPorOrderId,
  listarTodos,
  atualizar,
  deletar
};
