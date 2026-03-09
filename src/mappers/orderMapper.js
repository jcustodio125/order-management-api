/**
 * Funções para transformação de dados entre formato PT-BR e EN
 */

/**
 * Extrai orderId do numeroPedido removendo sufixo após último hífen
 */
function extrairOrderId(numeroPedido) {
  const ultimoHifenIndex = numeroPedido.lastIndexOf('-');
  if (ultimoHifenIndex === -1) return numeroPedido;
  return numeroPedido.substring(0, ultimoHifenIndex);
}

/**
 * Transforma dados de entrada (PT-BR) para formato de saída (EN)
 */
function transformarParaSaida(dadosEntrada) {
  return {
    orderId: extrairOrderId(dadosEntrada.numeroPedido),
    value: dadosEntrada.valorTotal,
    creationDate: new Date(dadosEntrada.dataCriacao).toISOString(),
    items: dadosEntrada.items.map(item => ({
      productId: parseInt(item.idItem, 10),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }))
  };
}

module.exports = {
  transformarParaSaida,
  extrairOrderId
};
