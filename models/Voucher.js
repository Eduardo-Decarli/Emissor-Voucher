const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const voucherSchema = new mongoose.Schema({
  codigo: {
    type: String,
    default: uuidv4,
    unique: true
  },
  hospedeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospede',
    required: true
  },
  validoAte: {
    type: Date,
    required: true
  }
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
