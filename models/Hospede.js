const mongoose = require('mongoose');

const hospedeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  dataCheckin: { type: Date, required: true },
  dataCheckout: { type: Date, required: true },
});

// Cria o modelo com o esquema definido
const Hospede = mongoose.model('Hospede', hospedeSchema);

module.exports = Hospede;
