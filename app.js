const express = require('express');
const path = require('path');
const { sequelize, connectMongo } = require('./config/database');
const session = require('./config/session');
const { setLocals } = require('./middleware/authMiddleware');
const routes = require('./routes'); 

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(session);


app.use(setLocals);


app.use(routes);


const startServer = async () => {
  try {
    await connectMongo();
    await sequelize.sync(); 
    console.log('PostgreSQL sincronizado.');
    
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
};

startServer();