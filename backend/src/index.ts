import dotenv from 'dotenv';  
dotenv.config();
import express, { Request, Response } from 'express';  
import axios from 'axios';  
import cors from 'cors';
import path from 'path';

console.log('API_KEY:', process.env.API_KEY); // Verifique se a variável de ambiente foi carregada corretamente

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/weather', async (req: Request, res: Response) => {
  const city: string = req.query.city as string;
  const apiKey = process.env.API_KEY;
  
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados da API.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// depois de app.use(cors()); e app.use(express.json());
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../dist/project_weather_forecast/browser')));

// rota fallback para SPA (Angular)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/project_weather_forecast/browser/index.html'));
});