const express = require('express');
const router = express.Router();
const Hospede = require('../models/Hospede');

// Adiciona um novo hóspede
router.post('/', async (req, res) => {
  try {
    const { nome, email, telefone, dataCheckin, dataCheckout } = req.body;
    const novoHospede = new Hospede({ nome, email, telefone, dataCheckin, dataCheckout });
    await novoHospede.save();
    res.status(201).send(novoHospede);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Obtém todos os hóspedes
router.get('/', async (req, res) => {
  try {
    const hospedes = await Hospede.find();
    res.send(hospedes);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
