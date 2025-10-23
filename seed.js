require('dotenv').config();

const { sequelize } = require('./config/database'); 
const Usuario = require('./models/sequelize/Usuario'); 

const seedAdmin = async () => {
  try {
    await sequelize.sync(); 
    console.log('Tabela "usuarios" sincronizada.');

   
    const adminLogin = 'admin@utfpr.edu.br';
    const adminPass = 'admin123';

   
    const adminExists = await Usuario.findOne({ where: { login: adminLogin } });

    if (!adminExists) {
      
      await Usuario.create({
        login: adminLogin,
        senhaHash: adminPass, 
        nome: 'Administrador',
        tipo: 'admin',
        ativo: true
      });
      console.log('Usuário admin criado com sucesso.');
    } else {
      
      console.log('Usuário admin já existe.');
    }
  } catch (error) {
    console.error('Erro ao executar o seed:', error);
  } finally {
    
    await sequelize.close();
    console.log('Conexão com o banco fechada.');
  }
};

seedAdmin();