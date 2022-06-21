const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'proyecto.crueltyscan@gmail.com',
    pass: 'xpppbzmqjjkebnec'
  }
}));

const enviarEmailRegistro = (email, usuario) => {
  const mailOptions = {
    from: 'proyecto.crueltyscan@gmail.com',
    to: email,
    subject: "Bienvenida a cruelty Scan",
    text: `Hola ${usuario}!, estamos agradecidos por que te hayas registrado! \n\n\n\n Somos Cruelty Scan!`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const enviarEmailRecuperar = (email, usuario, codigo) => {
  const mailOptions = {
    from: 'crueltyscan@gmail.com',
    to: email,
    subject: `Codigo de recuperación - Cruelty Scan`,
    text: `Hola ${usuario}!, este es tu codigo de recuperación: ${codigo} \n\n\n\n Cruelty Scan`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { enviarEmailRegistro, enviarEmailRecuperar }