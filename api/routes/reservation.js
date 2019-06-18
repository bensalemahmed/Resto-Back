const router = require('express').Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken')
const plat = require("../models/plat");
const resto = require("../models/resto");

const nodemailer = require('nodemailer');

let auth = require("./authjwt");

// *************************************************************** send mail *****************************************************************************
router.post('/sedmail', async (req, res) => {

  const emailResult = await sendEmail(req.body);
  res.send({ msg: 'OK', data: emailResult });
});
async function sendEmail(emailBody) {
  var smtpTransport = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    auth: {
      user: 'chehir.dhaw@gmail.com', // TODO: To change
      pass: 'b19e6fa2-bc9c-4be8-9c47-bff050172457',
    },
  });

  const message = `Votre reservation est en cours de traitement`;

  let mailOptions = {
    from: emailBody.emailFrom,
    to:  emailBody.emailTo, // TODO: To change
    subject: emailBody.sub,
    html:  emailBody.message
  };

  let info = await smtpTransport.sendMail(mailOptions).catch(err => err)

  if (info.err) {
    return { msg: 'email not sent !' }
  }
  return { msg: 'email sent !' }

}

// *************************************************************** send mail *****************************************************************************



module.exports = router;