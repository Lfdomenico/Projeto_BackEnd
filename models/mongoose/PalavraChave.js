const mongoose = require('mongoose');
const { Schema } = mongoose;

const PalavraChaveSchema = new Schema({
    nome: { type: String, required: true, unique: true, trim: true }
  });
  const PalavraChave = mongoose.model('PalavraChave', PalavraChaveSchema);

  module.exports = { PalavraChave };