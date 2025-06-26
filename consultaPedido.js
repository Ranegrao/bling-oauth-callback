const axios = require('axios');

async function consultarPedido(numeroPedido, token) {
  try {
    const url = `https://www.bling.com.br/Api/v3/pedidos?limit=1`;
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
  raw: pedido};
      situacao: pedido.situacao,
      cliente: (pedido.cliente || {}).nome || 'Nome não informado',
      data: pedido.data
    };

  } catch (error) {
    console.error("Erro na consulta:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return null;
  }
}

module.exports = consultarPedido;
