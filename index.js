const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const port = 3000;
const path = require('path');
require('dotenv').config();

app.use(
    express.urlencoded({
        extended: true
    }),
)

const basePath = path.join(__dirname, 'templates');

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`=====> Express Running at ${port} !!!`);
});

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);
});

//Mailer 
const user = process.env.USER_MAIL
const pass = process.env.PASSWORD

const myMails = ['juliodev220@gmail.com', 'juniorknx@hotmail.com']

app.post('/send/success', (req, res) => {

    const { name, message } = req.body
    console.log(name, message)
    res.sendFile(`${basePath}/success.html`)

    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user,
            pass
        }
    })

    transporter.sendMail({
        from: user,
        to: myMails,
        replyTo: user,
        subject: `Você recebeu um e-mail de teste de ${name}`,
        text: message
    }).then(info => {
        res.send(info)
    }).catch(err => {
        res.send(err)
    })
})

