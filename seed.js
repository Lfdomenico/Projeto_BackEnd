// Carrega as variáveis de ambiente (do .env)
require('dotenv').config();

// Importa os módulos necessários
// Os caminhos partem da raiz do projeto
const { sequelize } = require('./config/database'); 
const Usuario = require('./models/sequelize/Usuario'); 

const seedAdmin = async () => {
  try {
    // Sincroniza o modelo para garantir que a tabela 'usuarios' exista
    await sequelize.sync(); 
    console.log('Tabela "usuarios" sincronizada.');

    // Dados do admin (pode pegar do .env se preferir)
    const adminLogin = 'admin@utfpr.edu.br';
    const adminPass = 'admin123';

    // 1. Verifica se o admin já existe
    const adminExists = await Usuario.findOne({ where: { login: adminLogin } });

    if (!adminExists) {
      // 2. Se não existir, cria o usuário
      await Usuario.create({
        login: adminLogin,
        senhaHash: adminPass, // O Hook "beforeCreate" no model Usuario.js vai hashear isso
        nome: 'Administrador',
        tipo: 'admin',
        ativo: true
      });
      console.log('Usuário admin criado com sucesso.');
    } else {
      // 3. Se já existir, avisa
      console.log('Usuário admin já existe.');
    }
  } catch (error) {
    console.error('Erro ao executar o seed:', error);
  } finally {
    // 4. Fecha a conexão com o banco de dados
    // Isso é crucial para que o script termine e não fique "preso"
    await sequelize.close();
    console.log('Conexão com o banco fechada.');
  }
};

// Executa a função
seedAdmin();