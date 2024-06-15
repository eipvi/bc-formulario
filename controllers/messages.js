const express = require("express");
const router = express.Router();
const nodeMailer = require('nodemailer');
//Incluir as bibliotecas
//Gerenciar as requisições, rotas e URL, entre outras funcionalidades
//Chamar a função express

// Configuração do transporte SMTP
const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST, // Substitua pelo host do seu servidor SMTP
    port: process.env.SMTP_PORT,
    secure: false, // true para 465, false para outras portas
    auth: {
        user: process.env.SMTP_USER, // Substitua pelo seu email
        pass: process.env.SMTP_PASS // Substitua pela sua senha
    },
    connectionTimeout: 10000 // 10 segundos
});

//Criar a rota cadastrar  
//POST é o responsável por receber os dados do formulário e enviar o email.
//GET não é usado para enviar dados ou emails neste caso.
router.post("/", async (req, res) => {
   // Receber os dados enviados no corpo da requisição (nome, email, número)
   const { name, email, number } = req.body;

   // Configurações do email
   const info = await transporter.sendMail({
       from: `"${name}" <${email}>`,
       to: 'satsconf@gmail.com', // Substitua pelo email do destinatário
       subject: "Contato conectado",
       text: `Name: ${name}\nEmail: ${email}\nNúmero: ${number}`
   });

   console.log('Email enviado: %s', info.messageId);
   res.json({
       error: false,
       message: 'Email enviado com sucesso',
       info: info
   });
});

//exportar a instrução que está dentro da constante router

module.exports = router;