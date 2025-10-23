
const { Projeto, PalavraChave, Conhecimento, ConhecimentoAluno } = require('../models/mongoose');
const Usuario = require('../models/sequelize/Usuario');

const alunoController = {

  
  showDashboard: async (req, res) => {
    try {
      const alunoId = req.session.user.id;

      
      const projetos = await Projeto.find({ alunoId: alunoId })
                                    .populate('palavrasChave')
                                    .sort({ createdAt: -1 });
      const conhecimentosAluno = await ConhecimentoAluno.find({ alunoId: alunoId })
                                                        .populate('conhecimento')
                                                        .sort({ nivel: -1 });

      
      const conhecimentosDisponiveis = await Conhecimento.find().sort({ nome: 1 });
      
     
      const idsConhecimentosAluno = conhecimentosAluno.map(c => c.conhecimento._id.toString());
      const conhecimentosParaDropdown = conhecimentosDisponiveis.filter(
        c => !idsConhecimentosAluno.includes(c._id.toString())
      );

      res.render('aluno/dashboard', {
        projetos: projetos,
        conhecimentos: conhecimentosAluno, 
        conhecimentosDisponiveis: conhecimentosParaDropdown 
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar o dashboard.');
    }
  },


 showNovoProjetoForm: async (req, res) => {
    try {
      const palavrasChave = await PalavraChave.find().sort({ nome: 1 });
      res.render('aluno/projeto_form', { 
        projeto: {}, 
        palavrasChave: palavrasChave
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar formulário.');
    }
  },
  createProjeto: async (req, res) => {
    try {
      const { nome, resumo, link, palavrasChaveIds } = req.body;
      const alunoId = req.session.user.id; 

      const novoProjeto = new Projeto({
        nome,
        resumo,
        link,
        alunoId: alunoId, 
        palavrasChave: palavrasChaveIds 
      });

      await novoProjeto.save();
      res.redirect('/aluno/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao salvar projeto.');
    }
  },

  
  showEditProjetoForm: async (req, res) => {
    try {
      const { id } = req.params;
      const alunoId = req.session.user.id;

      const projeto = await Projeto.findById(id);


      if (!projeto || projeto.alunoId !== alunoId) {
        return res.status(403).send('Acesso negado.');
      }

      const palavrasChave = await PalavraChave.find().sort({ nome: 1 });
      
      res.render('aluno/projeto_form', { 
        projeto: projeto,
        palavrasChave: palavrasChave
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar formulário de edição.');
    }
  },

  
  updateProjeto: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, resumo, link, palavrasChaveIds } = req.body;
      const alunoId = req.session.user.id;

      
      const projeto = await Projeto.findById(id);
      if (!projeto || projeto.alunoId !== alunoId) {
        return res.status(403).send('Acesso negado.');
      }
      await Projeto.findByIdAndUpdate(id, {
        nome,
        resumo,
        link,
        palavrasChave: palavrasChaveIds
      });

      res.redirect('/aluno/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar projeto.');
    }
  },

  deleteProjeto: async (req, res) => {
    try {
      const { id } = req.params;
      const alunoId = req.session.user.id;

      
      const projeto = await Projeto.findById(id);
      if (!projeto || projeto.alunoId !== alunoId) {
        return res.status(403).send('Acesso negado.');
      }

      await Projeto.findByIdAndDelete(id);
      res.redirect('/aluno/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao deletar projeto.');
    }
  },

  addConhecimento: async (req, res) => {
    try {
      const { conhecimentoId, nivel } = req.body;
      const alunoId = req.session.user.id;

  
      if (!conhecimentoId || !nivel) {
        return res.status(400).send('Dados incompletos.');
      }

      const existe = await ConhecimentoAluno.findOne({
        alunoId: alunoId,
        conhecimento: conhecimentoId
      });

      if (existe) {
       
        existe.nivel = nivel;
        await existe.save();
      } else {
        await ConhecimentoAluno.create({
          alunoId: alunoId,
          conhecimento: conhecimentoId,
          nivel: nivel
        });
      }
      
     
      res.redirect('/aluno/dashboard');

    } catch (error) {
      console.error('Erro ao adicionar conhecimento:', error);
      res.redirect('/aluno/dashboard');
    }
  },

  
  deleteConhecimento: async (req, res) => {
    try {
      const { id } = req.params; 
      const alunoId = req.session.user.id;

     
      const conhecimentoAluno = await ConhecimentoAluno.findById(id);
      if (!conhecimentoAluno || conhecimentoAluno.alunoId !== alunoId) {
        return res.status(403).send('Acesso negado.');
      }

      await ConhecimentoAluno.findByIdAndDelete(id);
      
     
      res.redirect('/aluno/dashboard');
    } catch (error) {
      console.error('Erro ao deletar conhecimento:', error);
      res.redirect('/aluno/dashboard');
    }
  }
};

module.exports = alunoController;