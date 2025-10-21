const Usuario = require('../models/sequelize/Usuario'); // PostgreSQL
const { PalavraChave, Conhecimento, Projeto, ConhecimentoAluno } = require('../models/mongoose'); // MongoDB

const adminController = {


  showDashboard: (req, res) => {
    // Renderiza 'views/admin/dashboard.ejs'
    res.render('admin/dashboard', {
      pageTitle: 'Painel Administrativo'
    });
  },

 
  listarAlunos: async (req, res) => {
    try {
      const alunos = await Usuario.findAll({
        where: { tipo: 'aluno' },
        order: [['nome', 'ASC']]
      });
      res.render('admin/alunos', { // 'views/admin/alunos.ejs'
        alunos: alunos
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao listar alunos.');
    }
  },

  showNovoAlunoForm: (req, res) => {
    res.render('admin/aluno_form', { // 'views/admin/aluno_form.ejs'
      aluno: {} // Objeto vazio para o formulário
    });
  },

  // POST /admin/alunos/novo
  createAluno: async (req, res) => {
    try {
      const { nome, login, senha, ativo } = req.body;
      await Usuario.create({
        nome,
        login,
        senhaHash: senha, // O Hook do model vai hashear a senha
        tipo: 'aluno',
        ativo: ativo === 'on' // Checkbox
      });
      res.redirect('/admin/alunos');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao criar aluno.');
    }
  },

  // GET /admin/alunos/editar/:id
  showEditAlunoForm: async (req, res) => {
    try {
      const { id } = req.params;
      const aluno = await Usuario.findByPk(id);
      if (!aluno) return res.redirect('/admin/alunos');
      
      res.render('admin/aluno_form', { // Reutiliza o mesmo formulário
        aluno: aluno
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar aluno.');
    }
  },

  // POST /admin/alunos/editar/:id
  updateAluno: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, login, senha, ativo } = req.body;
      
      const aluno = await Usuario.findByPk(id);
      if (!aluno) return res.redirect('/admin/alunos');
      
      aluno.nome = nome;
      aluno.login = login;
      aluno.ativo = ativo === 'on';
      
      // Só atualiza a senha se uma nova foi digitada
      if (senha) {
        aluno.senhaHash = senha; // O Hook do model vai hashear
      }
      
      await aluno.save();
      res.redirect('/admin/alunos');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar aluno.');
    }
  },
  
  // POST /admin/alunos/deletar/:id
  deleteAluno: async (req, res) => {
    try {
      const { id } = req.params;

      await Usuario.destroy({ where: { id: id } });
      
      // Limpeza no MongoDB (opcional, mas recomendado)
      await Projeto.deleteMany({ alunoId: id });
      await ConhecimentoAluno.deleteMany({ alunoId: id });

      res.redirect('/admin/alunos');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao deletar aluno.');
    }
  },


  listarPalavrasChave: async (req, res) => {
    try {
      const palavras = await PalavraChave.find().sort({ nome: 1 });
      res.render('admin/palavras_chave', { // 'views/admin/palavras_chave.ejs'
        palavras: palavras
      });
    } catch (error) {
      res.status(500).send('Erro ao listar palavras-chave.');
    }
  },
  
  createPalavraChave: async (req, res) => {
    try {
      const { nome } = req.body;
      if (nome) {
        await PalavraChave.create({ nome });
      }
      res.redirect('/admin/palavras-chave');
    } catch (error) {
      res.status(500).send('Erro ao criar palavra-chave.');
    }
  },
  
  deletePalavraChave: async (req, res) => {
    try {
      const { id } = req.params;
      await PalavraChave.findByIdAndDelete(id);
      res.redirect('/admin/palavras-chave');
    } catch (error) {
      res.status(500).send('Erro ao deletar palavra-chave.');
    }
  },

  listarConhecimentos: async (req, res) => {
    try {
      const conhecimentos = await Conhecimento.find().sort({ nome: 1 });
      res.render('admin/conhecimentos', { // 'views/admin/conhecimentos.ejs'
        conhecimentos: conhecimentos
      });
    } catch (error) {
      res.status(500).send('Erro ao listar conhecimentos.');
    }
  },
  
  createConhecimento: async (req, res) => {
    try {
      const { nome, area } = req.body;
      if (nome) {
        await Conhecimento.create({ nome, area });
      }
      res.redirect('/admin/conhecimentos');
    } catch (error) {
      res.status(500).send('Erro ao criar conhecimento.');
    }
  },
  
  deleteConhecimento: async (req, res) => {
    try {
      const { id } = req.params;
      await Conhecimento.findByIdAndDelete(id);
      // Limpeza: remover este conhecimento de todos os alunos
      await ConhecimentoAluno.deleteMany({ conhecimento: id });
      res.redirect('/admin/conhecimentos');
    } catch (error) {
      res.status(500).send('Erro ao deletar conhecimento.');
    }
  }

};

module.exports = adminController;