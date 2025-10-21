const {Sequelize} = require(Sequelize)
const mongoose = require('mongoose');
require('dotenv').config();

// Configuração do Sequelize (PostgreSQL)
const sequelize = new Sequelize(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  dialect: 'postgres',
  logging: false
});

// Configuração do Mongoose (MongoDB)
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectMongo };