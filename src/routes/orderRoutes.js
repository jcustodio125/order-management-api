/**
 * Rotas para gerenciamento de pedidos
 */

const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');

// POST /order - Criar novo pedido
router.post('/order', async (req, res, next) => {
  try {
    const pedido = await orderService.criarPedido(req.body);
    res.status(201).json(pedido);
  } catch (erro) {
    next(erro);
  }
});

// GET /order/list - Listar todos os pedidos (deve vir antes de /:numeroPedido)
router.get('/order/list', async (req, res, next) => {
  try {
    const pedidos = await orderService.listarPedidos();
    res.status(200).json(pedidos);
  } catch (erro) {
    next(erro);
  }
});

// GET /order/:numeroPedido - Obter pedido específico
router.get('/order/:numeroPedido', async (req, res, next) => {
  try {
    const pedido = await orderService.obterPedido(req.params.numeroPedido);
    res.status(200).json(pedido);
  } catch (erro) {
    next(erro);
  }
});

// PUT /order/:numeroPedido - Atualizar pedido
router.put('/order/:numeroPedido', async (req, res, next) => {
  try {
    const pedido = await orderService.atualizarPedido(req.params.numeroPedido, req.body);
    res.status(200).json(pedido);
  } catch (erro) {
    next(erro);
  }
});

// DELETE /order/:numeroPedido - Deletar pedido
router.delete('/order/:numeroPedido', async (req, res, next) => {
  try {
    await orderService.deletarPedido(req.params.numeroPedido);
    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
});

module.exports = router;
