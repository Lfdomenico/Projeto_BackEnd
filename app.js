const express = require('express');
const path = require('path');
const { sequelize, connectMongo } = require('./config/database');
const session = require('./config/session');
const { setLocals } = require('./middleware/authMiddleware');
const routes = require('./routes'); // Importa o roteador principal

const app = express();
const port = process.env.PORT || 3000;

// Middlewares essenciais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sessão
app.use(session);

// Middleware global para res.locals
app.use(setLocals);

// Rotas principais
app.use(routes);

// Inicialização
const startServer = async () => {
  try {
    // 1. Conectar ao MongoDB
    await connectMongo();
    // 2. Sincronizar Sequelize (PostgreSQL)
    // CUIDADO: { force: true } apaga o banco. Use só em dev.
    await sequelize.sync(); 
    console.log('PostgreSQL sincronizado.');
    // 3. Iniciar o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
};

startServer();