//importa o módulo express para Criar o servidor
const express = require('express');
//importa o módulo Mongoose para conectar ao MongoDB
const mongoose = requere('mongoose')
//Instancia do Express
const app = express();
//Define a porta de escuta do servidor
const port = 3000;

//conectar ao mongooseDB usando Mongoose
mongoose.connect('ongodb://localhost:27017/voucher-system',{
    userNewUrlParser:true,
    useNewUrlTopology: true
})
.then(() =>console.log('Conectado ao mongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB', err));

//Middleware para analisar as requisições como JSON
app.use(express.json())

//Teste para verificar se o servidor está funcionando
app.get('/',(req,res) =>{
    res.send('Servidor está rodando')
})

//Iniciar o servidor e escutar a porta especificada
app.listen(port, () => {
    console.log('Servidor rodando em ongodb://localhost:${port}')
})