require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || process.env.DEFAULT_PORT;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));