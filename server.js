// Importa o módulo express para criar o servidor
const express = require('express');
// Importa o módulo mongoose para conectar ao MongoDB
const mongoose = require('mongoose');
// Instância do Express
const app = express();
// Define a porta de escuta do servidor
const port = 3000;

// Conecta ao MongoDB usando Mongoose
mongoose.connect('mongodb://localhost:27017/voucher-system')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Importa as rotas
const hospedesRouter = require('./routes/hospedes');
const vouchersRouter = require('./routes/vouchers');

// Usa as rotas
app.use('/hospedes', hospedesRouter);
app.use('/vouchers', vouchersRouter);

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor está rodando');
});

// Inicia o servidor e escuta na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
