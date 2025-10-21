const { Projeto } = require('./Projeto');
const { PalavraChave } = require('./PalavraChave');
const { Conhecimento } = require('./Conhecimento');
const { ConhecimentoAluno } = require('./ConhecimentoAluno');

// Exporta todos eles em um único objeto
module.exports = {
  Projeto,
  PalavraChave,
  Conhecimento,
  ConhecimentoAluno
};