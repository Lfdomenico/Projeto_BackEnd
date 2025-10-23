const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConhecimentoSchema = new Schema({
    nome: { type: String, required: true, unique: true, trim: true },
    area: { type: String, trim: true } 
  });
  const Conhecimento = mongoose.model('Conhecimento', ConhecimentoSchema);

  module.exports = { Conhecimento };