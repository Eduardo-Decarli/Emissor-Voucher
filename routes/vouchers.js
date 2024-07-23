const express = require('express');
const router = express.Router();
const Voucher = require('../models/Voucher');
const Hospede = require('../models/Hospede');
const { v4: uuidv4 } = require('uuid');

// Adiciona um novo voucher
router.post('/', async (req, res) => {
  try {
    const { hospedeId, validoAte } = req.body;
    // Verifica se o hóspede existe
    const hospede = await Hospede.findById(hospedeId);
    if (!hospede) {
      return res.status(404).send('Hóspede não encontrado');
    }

    const codigo = uuidv4();
    const novoVoucher = new Voucher({ codigo, hospedeId, validoAte });
    await novoVoucher.save();
    res.status(201).send(novoVoucher);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Obtém todos os vouchers
router.get('/', async (req, res) => {
  try {
    const vouchers = await Voucher.find().populate('hospedeId');
    res.send(vouchers);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
