const axios = require('axios');

async function consultarPedido(numeroPedido, token) {
  const url = `https://bling.com.br/Api/v3/pedidos?filters=numeroLoja[igual]=${numeroPedido}`;
  console.log('🔎 consultando no Bling:', url);
  const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = response.data.data;
  const pedido = Array.isArray(data) && data.length > 0 ? data[0] : null;
  if (!pedido) throw new Error('Pedido não encontrado');
  return {
    raw: pedido,
    situacao: pedido.situacao,
    cliente: (pedido.cliente || {}).nome || 'Nome não informado',
    data: pedido.data
  };
}
module.exports = consultarPedido;
