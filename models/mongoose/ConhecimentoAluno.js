const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConhecimentoAlunoSchema = new Schema({
    // Referência ao ID do usuário no PostgreSQL (INTEGER)
    alunoId: { type: Number, required: true },
    // Referência ao Conhecimento
    conhecimento: { type: Schema.Types.ObjectId, ref: 'Conhecimento', required: true },
    nivel: { type: Number, required: true, min: 0, max: 10 }
  }, { 
    // Garante que um aluno só tenha um nível por conhecimento
    unique: ['alunoId', 'conhecimento'] 
  });
  const ConhecimentoAluno = mongoose.model('ConhecimentoAluno', ConhecimentoAlunoSchema);
  
  module.exports = { ConhecimentoAluno };