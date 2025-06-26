const express = require('express');
const consultarPedido = require('./consultaPedido');

const app = express();

app.get('/pedido', async (req, res) => {
  const numero = req.query.numero;
  const token = req.query.token;

  console.log('🏷️ ROTA /pedido chamada com:', { numero, token });

  if (!numero || !token) {
    console.log('❌ Faltou numero ou token');
    return res.status(400).send('Número do pedido ou token ausente.');
  }

  try {
    const pedido = await consultarPedido(numero, token);
    console.log('✅ Pedido encontrado:', pedido);
    return res.json(pedido);
  } catch (err) {
    console.error('🔥 ERRO ao consultar pedido:', err.message);
    return res.status(500).send('Erro ao consultar pedido.');
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`));
