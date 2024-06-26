const express = require("express");
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors()); // Permite requisições de qualquer origem

//criar omiddleware para receber os dados no corpo da requisição
app.use(express.json());

//get-É usado para buscar dados do servidor.
//Não modifica ou envia dados do cliente para o servidor.
app.get("/", (req, res) => {
    return res.send("hello world");
});

//incluir as CONTROLLERS
const messages = require("./controllers/messages");
//criar as rotas
app.use('/message', messages);

const port = process.env.PORT || 3001;
app.listen(3001, () => {
    console.log("servidor iniciado na porta 3001: http://localhost:3001");
});