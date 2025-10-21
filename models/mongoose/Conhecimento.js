const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConhecimentoSchema = new Schema({
    nome: { type: String, required: true, unique: true, trim: true },
    // opcional: area (ex: "Frontend", "Backend", "DevOps")
    area: { type: String, trim: true } 
  });
  const Conhecimento = mongoose.model('Conhecimento', ConhecimentoSchema);

  module.exports = { Conhecimento };