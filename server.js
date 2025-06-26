const express = require('express');
const axios = require('axios');
const consultarPedido = require('./consultaPedido');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h2>Servidor funcionando. Use /pedido?numero=123</h2>');
});

app.get('/pedido', async (req, res) => {
  const { numero } = req.query;
  const token = (req.headers.authorization && req.headers.authorization.replace('Bearer ', '')) || req.query.token;

  if (!numero || !token) {
    return res.status(400).send('Número do pedido ou token ausente.');
  }

  const resultado = await consultarPedido(numero, token);
  if (!resultado) {
    return res.status(500).send('Erro ao consultar pedido.');
  }

  res.json(resultado);
});

app.listen(PORT, () => {
  console.log("Requisição recebida com número:", numeroPedido, "e token:", token);
});
