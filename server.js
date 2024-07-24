const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/voucher-system')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const hospedesRouter = require('./routes/hospedes');
const vouchersRouter = require('./routes/vouchers');

app.use('/hospedes', hospedesRouter);
app.use('/vouchers', vouchersRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
