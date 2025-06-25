const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://bonishop-callback.onrender.com';

app.get('/', async (req, res) => {
  const { code, state } = req.query;

  if (!code) return res.status(400).send('Código de autorização não encontrado.');

  try {
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    const response = await axios.post('https://www.bling.com.br/Api/v3/oauth/token', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI
    }, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    const { access_token, expires_in } = response.data;

    console.log('Access Token:', access_token);

    res.send(`
      <h2>Autorização concluída com sucesso!</h2>
      <p><strong>Access Token:</strong> ${access_token}</p>
      <p><strong>Expira em:</strong> ${expires_in} segundos</p>
    `);
  } catch (error) {
    console.error('Erro ao obter token:', error.response?.data || error.message);
    res.status(500).send('Erro ao obter token. Verifique o console.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
