const express = require('express');
const path = require('path');
const { sequelize, connectMongo } = require('./config/database');
const session = require('./config/session');
const { setLocals } = require('./middleware/authMiddleware');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares essenciais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session);

// Middleware global para res.locals
app.use(setLocals);

// Rotas principais
app.use(routes);

// Inicialização
const startServer = async () => {
  try {
    // Conectar ao MongoDB
    await connectMongo();
    // Sincronizar Sequelize (PostgreSQL)
    await sequelize.sync(); 
    console.log('PostgreSQL sincronizado.');
    // Iniciar o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
};

startServer();