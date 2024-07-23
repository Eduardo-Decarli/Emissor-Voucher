const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  codigo: { type: String, required: true },
  hospedeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospede', required: true },
  dataEmissao: { type: Date, default: Date.now },
  validoAte: { type: Date, required: true },
});

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;
