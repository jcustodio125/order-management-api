const mongoose = require('mongoose');

/**
 * Schema para itens do pedido
 * Cada item contém productId (ID do produto), quantity (quantidade) e price (preço unitário)
 * Validações garantem que todos os valores sejam positivos e quantity seja inteiro
 */
const itemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: [true, 'productId é obrigatório'],
    min: [1, 'productId deve ser maior que zero']
  },
  quantity: {
    type: Number,
    required: [true, 'quantity é obrigatório'],
    min: [1, 'quantity deve ser maior que zero'],
    validate: {
      validator: Number.isInteger,
      message: 'quantity deve ser um número inteiro'
    }
  },
  price: {
    type: Number,
    required: [true, 'price é obrigatório'],
    min: [0.01, 'price deve ser maior que zero']
  }
}, { _id: false }); // _id: false evita criação de _id para subdocumentos

/**
 * Schema principal para pedidos
 * Armazena orderId como chave única indexada, value, creationDate e items embutidos
 * Estratégia de embedded documents garante atomicidade nas operações
 */
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: [true, 'orderId é obrigatório'],
    unique: true, // Garante que não haja pedidos duplicados
    index: true,  // Índice para busca eficiente por orderId
    trim: true    // Remove espaços em branco nas extremidades
  },
  value: {
    type: Number,
    required: [true, 'value é obrigatório'],
    min: [0.01, 'value deve ser maior que zero']
  },
  creationDate: {
    type: String,
    required: [true, 'creationDate é obrigatório']
  },
  items: {
    type: [itemSchema],
    required: [true, 'items é obrigatório'],
    validate: {
      validator: function(items) {
        return items && items.length > 0;
      },
      message: 'items deve conter pelo menos um item'
    }
  }
}, {
  timestamps: false, // Não adiciona createdAt/updatedAt automáticos
  versionKey: false  // Remove campo __v de versionamento
});

/**
 * Modelo Order para operações no MongoDB
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
