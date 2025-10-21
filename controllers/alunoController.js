// Importa os models do Mongoose
const { Projeto, PalavraChave, Conhecimento, ConhecimentoAluno } = require('../models/mongoose');
// Importa o model do Sequelize
const Usuario = require('../models/sequelize/Usuario');

// (A) O objeto principal
const alunoController = {

  // (B) A FUNÇÃO QUE ESTÁ FALTANDO OU COM NOME ERRADO
  // GET /aluno/dashboard
  showDashboard: async (req, res) => {
    try {
      // Pega o ID do aluno logado na sessão
      const alunoId = req.session.user.id;

      // Busca os projetos deste aluno
      const projetos = await Projeto.find({ alunoId: alunoId })
                                    .populate('palavrasChave')
                                    .sort({ createdAt: -1 });

      // Busca os conhecimentos deste aluno
      const conhecimentos = await ConhecimentoAluno.find({ alunoId: alunoId })
                                                   .populate('conhecimento');

      res.render('aluno/dashboard', { // Renderiza a view 'views/aluno/dashboard.ejs'
        projetos: projetos,
        conhecimentos: conhecimentos
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar o dashboard.');
    }
  },

  // --- Funções de Projeto ---
  // (Aqui entram todas as outras funções: showNovoProjetoForm, createProjeto, etc...)
  
  // GET /aluno/projetos/novo
  showNovoProjetoForm: async (req, res) => { /* ... */ },
  
  // POST /aluno/projetos
  createProjeto: async (req, res) => { /* ... */ },
  
  // GET /aluno/projetos/editar/:id
  showEditProjetoForm: async (req, res) => { /* ... */ },
  
  // POST /aluno/projetos/editar/:id
  updateProjeto: async (req, res) => { /* ... */ },
  
  // POST /aluno/projetos/deletar/:id
  deleteProjeto: async (req, res) => { /* ... */ }

};

// (C) A LINHA DE EXPORTAÇÃO NO FINAL
module.exports = alunoController;