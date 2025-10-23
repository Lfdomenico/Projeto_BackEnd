const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjetoSchema = new Schema({
    nome: { type: String, required: true },
    resumo: { type: String, required: true },
    link: { type: String, required: true },
    alunoId: { type: String, required: true, index: true },  
    palavrasChave: [{ type: Schema.Types.ObjectId, ref: 'PalavraChave' }], 
    desenvolvedores: [{ type: String, index: true }]
  }, { timestamps: true });
  const Projeto = mongoose.model('Projeto', ProjetoSchema);

  module.exports = { Projeto };