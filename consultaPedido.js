const axios = require('axios');

async function consultarPedido(numeroPedido, token) {
  try {
    const response = await axios.get(`https://bling.com.br/Api/v3/pedidos?numero=${numeroPedido}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const pedido = response.data.data[0];

    return {
      numero: pedido.numero,
      situacao: pedido.situacao,
      cliente: pedido.cliente?.nome,
      data: pedido.data
    };

  } catch (error) {
    console.error("Erro na consulta:", error.response?.data || error.message);
    return null;
  }
}

module.exports = consultarPedido;
