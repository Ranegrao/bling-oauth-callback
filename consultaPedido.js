const axios = require('axios');

async function consultarPedido(numeroPedido, token) {
  try {
    const url = `https://bling.com.br/Api/v3/pedidos?filters=numeroLoja[igual]${numeroPedido}&limit=1`;
    console.log("Consultando Bling:", url);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = response.data.data;
    const pedido = Array.isArray(data) && data.length > 0 ? data[0] : null;

    if (!pedido) throw new Error('Pedido não encontrado na resposta.');

    return {
      raw: pedido,
      situacao: pedido.situacao,
      cliente: (pedido.cliente || {}).nome || 'Nome não informado',
      data: pedido.data
    };
  } catch (error) {
    console.error("Erro detalhado:", error.response?.data || error.message);
    throw new Error("Erro ao consultar pedido: " + (error.response?.data?.message || error.message));
  }
}

module.exports = consultarPedido;
