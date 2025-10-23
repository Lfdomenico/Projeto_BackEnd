const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConhecimentoAlunoSchema = new Schema({
    alunoId: { type: Number, required: true },
    
    conhecimento: { type: Schema.Types.ObjectId, ref: 'Conhecimento', required: true },
    nivel: { type: Number, required: true, min: 0, max: 10 }
  }, { 
    unique: ['alunoId', 'conhecimento'] 
  });
  const ConhecimentoAluno = mongoose.model('ConhecimentoAluno', ConhecimentoAlunoSchema);
  
  module.exports = { ConhecimentoAluno };