const express = require('express');
const router = express.Router();
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const Hospede = require('../models/Hospede');
const Voucher = require('../models/Voucher');

router.post('/addHospedeEVoucher', async (req, res) => {
    try {
        const { nome, email, telefone, dataCheckin, dataCheckout, validoAte } = req.body;
        const hospede = new Hospede({ nome, email, telefone, dataCheckin, dataCheckout });
        await hospede.save();

        const voucher = new Voucher({ hospedeId: hospede._id, validoAte });
        await voucher.save();

        res.json({ hospede, voucher });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar hóspede e voucher.' });
    }
});

router.get('/buscarHospedeEVoucher/:id', async (req, res) => {
    try {
        const hospede = await Hospede.findById(req.params.id);
        if (!hospede) {
            return res.status(404).json({ error: 'Hóspede não encontrado.' });
        }

        const voucher = await Voucher.findOne({ hospedeId: hospede._id });
        if (!voucher) {
            return res.status(404).json({ error: 'Voucher não encontrado.' });
        }

        res.json({ hospede, voucher });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar hóspede e voucher.' });
    }
});

// Nova rota para gerar o PDF
router.get('/gerarPDF/:id', async (req, res) => {
    try {
        const hospede = await Hospede.findById(req.params.id);
        if (!hospede) {
            return res.status(404).json({ error: 'Hóspede não encontrado.' });
        }

        const voucher = await Voucher.findOne({ hospedeId: hospede._id });
        if (!voucher) {
            return res.status(404).json({ error: 'Voucher não encontrado.' });
        }

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontSize = 12;

        page.drawText(`Nome: ${hospede.nome}`, { x: 50, y: height - 50, size: fontSize, font });
        page.drawText(`Email: ${hospede.email}`, { x: 50, y: height - 70, size: fontSize, font });
        page.drawText(`Telefone: ${hospede.telefone}`, { x: 50, y: height - 90, size: fontSize, font });
        page.drawText(`Check-in: ${new Date(hospede.dataCheckin).toLocaleDateString()}`, { x: 50, y: height - 110, size: fontSize, font });
        page.drawText(`Check-out: ${new Date(hospede.dataCheckout).toLocaleDateString()}`, { x: 50, y: height - 130, size: fontSize, font });
        page.drawText(`Voucher ID: ${voucher._id}`, { x: 50, y: height - 150, size: fontSize, font });
        page.drawText(`Válido Até: ${new Date(voucher.validoAte).toLocaleDateString()}`, { x: 50, y: height - 170, size: fontSize, font });

        const pdfBytes = await pdfDoc.save();

        res.setHeader('Content-Disposition', 'attachment; filename=reserva.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBytes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar PDF.' });
    }
});

module.exports = router;
