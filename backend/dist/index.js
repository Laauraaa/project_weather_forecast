"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// ✅ __dirname funciona direto em CommonJS
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;
    try {
        const response = await axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados da API.' });
    }
});
// ✅ Serve arquivos estáticos do Angular
app.use(express_1.default.static(path_1.default.join(__dirname, '../dist/project_weather_forecast/browser')));
// ✅ Rota fallback (SPA)
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../dist/project_weather_forecast/browser/index.html'));
});
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
