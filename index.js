const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/parse', async (req, res) => {
  const { url } = req.query;

  // Verifica se o parâmetro 'url' foi fornecido
  if (!url) {
    return res.status(400).json({ error: 'URL é um parâmetro obrigatório' });
  }

  try {
    // Realiza a chamada à API externa
    const response = await axios.get(`https://hahabypasser-secret-or-no.vercel.app/bypass?url=${url}`);
    
    // Verifica se o campo 'result' está presente na resposta
    const result = response.data.result;

    if (result) {
      return res.json({ result });
    } else {
      return res.status(500).json({ error: 'Resultado não encontrado na resposta da API externa' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar dados da URL fornecida' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
