# Order Management API

API REST para gerenciamento de pedidos.

## Tecnologias

- Node.js 18+
- Express
- MongoDB
- Docker

## Instalação

### Docker (Recomendado)

```bash
docker-compose up -d
```

### Manual

```bash
npm install
cp .env.example .env
npm start
```

## Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/order` | Criar pedido |
| GET | `/order/:numeroPedido` | Consultar pedido |
| GET | `/order/list` | Listar pedidos |
| PUT | `/order/:numeroPedido` | Atualizar pedido |
| DELETE | `/order/:numeroPedido` | Remover pedido |

## Exemplo de Requisição

```bash
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [{
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }]
  }'
```

## Transformação de Dados

A API recebe dados em português e armazena em inglês:

| Entrada (PT-BR) | Saída (EN) |
|-----------------|------------|
| numeroPedido | orderId |
| valorTotal | value |
| dataCriacao | creationDate |
| idItem | productId |
| quantidadeItem | quantity |
| valorItem | price |

## Configuração

Variáveis de ambiente (`.env`):

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/order-management
```

## Logging

Sistema de logs profissional com Winston:

- Logs com timestamp: `[YYYY-MM-DD HH:mm:ss]`
- Console (colorido) + arquivos
- `logs/app.log` - Todos os logs
- `logs/error.log` - Apenas erros
- Rotação automática (5MB por arquivo, 5 arquivos)

## Estrutura do Projeto

```
src/
├── routes/         # Definição de rotas
├── services/       # Lógica de negócio
├── mappers/        # Transformação de dados
├── database/       # Camada de persistência
├── middleware/     # Tratamento de erros e logging
└── utils/          # Utilitários (logger)
```

## Códigos de Resposta

- `201` - Recurso criado
- `200` - Sucesso
- `204` - Sem conteúdo
- `400` - Requisição inválida
- `404` - Recurso não encontrado
- `409` - Conflito (duplicação)
