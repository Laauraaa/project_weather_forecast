const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Caminho corrigido — resolve corretamente onde quer que esteja rodando
const frontendPath = path.resolve(__dirname, '../dist/project_weather_forecast/browser');

app.use(express.static(frontendPath));

app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  const API_KEY = process.env.API_KEY;

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'pt_br'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro:', error.message);
    res.status(500).json({ error: 'Erro ao acessar a API externa.' });
  }
});

// Servir o index.html corretamente
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
