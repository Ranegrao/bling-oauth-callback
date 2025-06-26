const axios = require('axios');

async function consultarPedido(numeroPedido, token) {
  try {
    const url = `https://www.bling.com.br/Api/v3/pedidos?filters=numeroLoja[igual]=${numeroPedido}`;
    console.log('URL construído Bling:', url);
    console.log('Token recebido:', token);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    console.log('Resposta Bling status:', response.status);
    console.log('Resposta Bling data:', JSON.stringify(response.data, null, 2));

    const data = response.data.retorno?.pedidos;
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Nenhum pedido encontrado no retorno do Bling');
    }

    const pedido = data[0].pedido;
    return {
      raw: pedido,
      situacao: pedido.situacao,
      cliente: pedido.cliente?.nome || 'Nome não informado',
      data: pedido.data
    };

  } catch (error) {
    console.error('🔴 Erro detalhado ao buscar pedido:', error.response?.status, error.response?.data || error.message);
    throw new Error(`Falha na consulta ao Bling: ${error.response?.status} – ${JSON.stringify(error.response?.data) || error.message}`);
  }
}

module.exports = consultarPedido;
