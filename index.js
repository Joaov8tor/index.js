const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/parse', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(`https://hahabypasser-secret-or-no.vercel.app/bypass?url=${url}`);
    const result = response.data.result;

    if (result) {
      return res.json({ result });
    } else {
      return res.status(500).json({ error: 'No result found in response' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching data from the provided URL' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
