const express = require('express');
const app = express();
const consultarPedido = require('./consultaPedido');

app.get('/pedido', async (req, res) => {
  const numeroPedido = req.query.numero;
  const token = req.query.token;

  console.log("Requisição recebida com número:", numeroPedido, "e token:", token);

  if (!numeroPedido || !token) {
    return res.status(400).send("Parâmetros 'numero' e 'token' são obrigatórios.");
  }

  try {
    const resultado = await consultarPedido(numeroPedido, token);
    res.json(resultado);
  } catch (error) {
    console.error("Erro ao consultar pedido:", error.message);
    res.status(500).send("Erro ao consultar pedido.");
  }
});

app.listen(10000, () => {
  console.log("Servidor ouvindo na porta 10000");
});
