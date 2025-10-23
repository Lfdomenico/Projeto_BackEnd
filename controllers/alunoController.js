const { Projeto, PalavraChave, Conhecimento, ConhecimentoAluno } = require('../models/mongoose');
// Importa o model do Sequelize
const Usuario = require('../models/sequelize/Usuario');
const { Op } = require('sequelize');

const alunoController = {

  
  // GET /aluno/dashboard
  showDashboard: async (req, res) => {
    try {
      const alunoId = req.session.user.id;
      
      const projetos = await Projeto.find({ 
          $or: [
              { alunoId: alunoId.toString() }, 
              { desenvolvedores: alunoId.toString() } 
          ]
      })
        .populate('palavrasChave')
        .sort({ createdAt: -1 });

      const conhecimentos = await ConhecimentoAluno.find({ alunoId: alunoId })
        .populate('conhecimento');

      res.render('aluno/dashboard', {
        projetos: projetos,
        conhecimentos: conhecimentos
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar o dashboard.');
    }
  },

  

  // GET /aluno/projetos/novo
  showNovoProjetoForm: async (req, res) => {
    try {
      const palavrasChave = await PalavraChave.find().sort({ nome: 1 });
      const alunos = await Usuario.findAll({
        where: {
          tipo: 'aluno',
          id: { [Op.ne]: req.session.user.id }
        },
        order: [['nome', 'ASC']]
      });

      res.render('aluno/projeto_form', {
        palavrasChave: palavrasChave,
        alunos: alunos,
        projeto: null, 
        action: '/aluno/projetos'
      });

    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar o formulário de novo projeto.');
    }
  },

  // POST /aluno/projetos
  createProjeto: async (req, res) => {
    try {
      const { nome, resumo, link } = req.body;
      const criadorId = req.session.user.id;

      let palavrasChaveIds = req.body.palavrasChaveIds;
      if (!palavrasChaveIds) palavrasChaveIds = [];
      else if (!Array.isArray(palavrasChaveIds)) palavrasChaveIds = [palavrasChaveIds];

      let desenvolvedorIds = req.body.desenvolvedores;
      if (!desenvolvedorIds) desenvolvedorIds = [];
      else if (!Array.isArray(desenvolvedorIds)) desenvolvedorIds = [desenvolvedorIds];

      if (!desenvolvedorIds.includes(criadorId.toString())) {
        desenvolvedorIds.push(criadorId.toString());
      }

      const novoProjeto = new Projeto({
        nome: nome,
        resumo: resumo,
        link: link,
        alunoId: criadorId.toString(),
        palavrasChave: palavrasChaveIds,
        desenvolvedores: desenvolvedorIds
      });

      await novoProjeto.save();
      res.redirect('/aluno/dashboard');

    } catch (error)
 {
      console.error("Erro ao criar projeto:", error);
      res.status(500).send('Erro ao salvar o projeto.');
    }
  },

  // GET /aluno/projetos/editar/:id
  showEditProjetoForm: async (req, res) => {
    try {
      const projetoId = req.params.id;
      const projeto = await Projeto.findById(projetoId);
      if (!projeto) {
        return res.status(404).send('Projeto não encontrado.');
      }

      const palavrasChave = await PalavraChave.find().sort({ nome: 1 });
      const alunos = await Usuario.findAll({
        where: {
          tipo: 'aluno',
          id: { [Op.ne]: req.session.user.id }
        },
        order: [['nome', 'ASC']]
      });

      res.render('aluno/projeto_form', {
        palavrasChave: palavrasChave,
        alunos: alunos,
        projeto: projeto,
        action: `/aluno/projetos/editar/${projeto._id}`
      });

    } catch (error) {
      console.error("Erro ao carregar formulário de edição:", error);
      res.status(500).send('Erro ao carregar o formulário de edição.');
    }
  },

  // POST /aluno/projetos/editar/:id
  updateProjeto: async (req, res) => {
    try {
      const projetoId = req.params.id;
      const alunoLogadoId = req.session.user.id;

      const projeto = await Projeto.findById(projetoId);
      if (!projeto) {
        return res.status(404).send('Projeto não encontrado.');
      }

      // Verificação de permissão corrigida
      const isCreator = projeto.alunoId.toString() === alunoLogadoId.toString();
      const isDeveloper = (projeto.desenvolvedores || []).map(id => id.toString()).includes(alunoLogadoId.toString());

      if (!isCreator && !isDeveloper) {
        return res.status(403).send('Acesso negado. Você não é o criador nem um desenvolvedor deste projeto.');
      }

      const { nome, resumo, link } = req.body;

      let palavrasChaveIds = req.body.palavrasChaveIds;
      if (!palavrasChaveIds) palavrasChaveIds = [];
      else if (!Array.isArray(palavrasChaveIds)) palavrasChaveIds = [palavrasChaveIds];

      let desenvolvedorIds = req.body.desenvolvedores;
      if (!desenvolvedorIds) desenvolvedorIds = [];
      else if (!Array.isArray(desenvolvedorIds)) desenvolvedorIds = [desenvolvedorIds];

      if (!desenvolvedorIds.includes(alunoLogadoId.toString())) {
        desenvolvedorIds.push(alunoLogadoId.toString());
      }

      projeto.nome = nome;
      projeto.resumo = resumo;
      projeto.link = link;
      projeto.palavrasChave = palavrasChaveIds;
      projeto.desenvolvedores = desenvolvedorIds;

      await projeto.save();
      res.redirect('/aluno/dashboard');

    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
      res.status(500).send('Erro ao atualizar o projeto.');
    }
  },
  // POST /aluno/projetos/deletar/:id
  deleteProjeto: async (req, res) => {
    try {
      const projetoId = req.params.id;
      const alunoLogadoId = req.session.user.id;

      const projeto = await Projeto.findById(projetoId);
      if (!projeto) {
        return res.status(404).send('Projeto não encontrado.');
      }

      if (projeto.alunoId.toString() !== alunoLogadoId.toString()) {
        return res.status(403).send('Acesso negado. Apenas o criador original pode excluir o projeto.');
      }

      await Projeto.findByIdAndDelete(projetoId);
      res.redirect('/aluno/dashboard');

    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
      res.status(500).send('Erro ao deletar o projeto.');
    }
  },

  
  // GET /aluno/conhecimentos
  showConhecimentosPage: async (req, res) => {
    try {
      const alunoId = req.session.user.id;

      const meusConhecimentos = await ConhecimentoAluno.find({ alunoId: alunoId })
        .populate('conhecimento')
        .sort({ 'conhecimento.nome': 1 });

      const conhecimentosDisponiveis = await Conhecimento.find().sort({ nome: 1 });

      res.render('aluno/conhecimentos_form', {
        meusConhecimentos: meusConhecimentos,
        conhecimentosDisponiveis: conhecimentosDisponiveis
      });
    } catch (error) {
      console.error("Erro ao carregar página de conhecimentos:", error);
      res.status(500).send('Erro ao carregar página de conhecimentos.');
    }
  },
  // POST /aluno/conhecimentos
  addConhecimento: async (req, res) => {
    try {
      const alunoId = req.session.user.id;
      const { conhecimentoId, nivel } = req.body;

      await ConhecimentoAluno.findOneAndUpdate(
        {
          alunoId: alunoId,
          conhecimento: conhecimentoId
        },
        {
          alunoId: alunoId,
          conhecimento: conhecimentoId,
          nivel: nivel
        },
        {
          upsert: true,
          new: true
        }
      );

      res.redirect('/aluno/conhecimentos');
    } catch (error) {
      console.error("Erro ao adicionar conhecimento:", error);
      res.status(500).send('Erro ao adicionar conhecimento.');
    }
  },

  // POST /aluno/conhecimentos/deletar/:id
  deleteConhecimento: async (req, res) => {
    try {
      const alunoConhecimentoId = req.params.id;
      const alunoId = req.session.user.id;

      await ConhecimentoAluno.findOneAndDelete({
        _id: alunoConhecimentoId,
        alunoId: alunoId
      });

      res.redirect('/aluno/conhecimentos');
    } catch (error) {
      console.error("Erro ao deletar conhecimento:", error);
      res.status(500).send('Erro ao deletar o conhecimento.');
    }
  } 

};

module.exports = alunoController;