const { Projeto, PalavraChave, Conhecimento, ConhecimentoAluno } = require('../models/mongoose');
const Usuario = require('../models/sequelize/Usuario');

const alunoController = {

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

module.exports = alunoController;