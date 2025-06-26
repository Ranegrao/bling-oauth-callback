const express = require('express');
const consultarPedido = require('./consultaPedido');

const app = express();
const port = process.env.PORT || 10000;

app.get('/pedido', async (req, res) => {
  const { numero, token } = req.query;
  console.log('Requisição recebida com número:', numero, 'e token:', token);

  if (!numero || !token) {
    return res.status(400).send('Parâmetros "numero" e "token" são obrigatórios');
  }

  try {
    const resultado = await consultarPedido(numero, token);
    res.json(resultado);
  } catch (err) {
    console.error('Erro geral:', err.message);
    res.status(500).send(err.message);
  }
});

app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));
