const { Projeto, PalavraChave, Conhecimento, ConhecimentoAluno } = require('../models/mongoose');

const publicController = { 

  listarProjetos: async (req, res) => { 
    try {
      const { keyword } = req.query;
      let filtro = {};
      if (keyword) {
        filtro.palavrasChave = keyword;
      }
      const projetos = await Projeto.find(filtro)
                                    .populate('palavrasChave')
                                    .sort({ createdAt: -1 });
      const palavrasChave = await PalavraChave.find().sort({ nome: 1 });
      
      res.render('index', {
        projetos: projetos,
        palavrasChave: palavrasChave,
        filtroAtual: keyword || ''
      });

    } catch (error) {
      console.error('Erro ao listar projetos:', error);
      res.status(500).send('Erro no servidor.');
    }
  },



  mostrarRelatorio: async (req, res) => {
    try {
      
       const mediaConhecimentos = await ConhecimentoAluno.aggregate([
        { $group: { _id: '$conhecimento', nivelMedio: { $avg: '$nivel' } } },
        { $lookup: { from: 'conhecimentos', localField: '_id', foreignField: '_id', as: 'conhecimentoInfo' } },
        { $unwind: '$conhecimentoInfo' },
        { $project: { nome: '$conhecimentoInfo.nome', nivelMedio: { $round: ['$nivelMedio', 1] } } },
        { $sort: { nivelMedio: -1 } }
      ]);

      res.render('relatorio', {
        mediaConhecimentos: mediaConhecimentos
      });

    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      res.status(500).send('Erro no servidor.');
    }
  }
};


module.exports = publicController;