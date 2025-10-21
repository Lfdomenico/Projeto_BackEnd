const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjetoSchema = new Schema({
    nome: { type: String, required: true },
    resumo: { type: String, required: true },
    link: { type: String, required: true },
    // Referência ao ID do usuário no PostgreSQL (INTEGER)
    // Não é um ObjectId, é uma referência "solta"
    alunoId: { type: Number, required: true, index: true },
    // Relação N:N com PalavrasChave
    palavrasChave: [{ type: Schema.Types.ObjectId, ref: 'PalavraChave' }]
  }, { timestamps: true });
  const Projeto = mongoose.model('Projeto', ProjetoSchema);

  module.exports = { Projeto };