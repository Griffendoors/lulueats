var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');


var app = require('../server');

let user = process.env.APP_EMAIL;
let pass = process.env.APP_EMAIL_PW;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user,
    pass: pass
  }
});





function validateMessage(senderName,senderEmail,senderMessage){

  if(senderName === null || senderEmail === null || senderMessage === null) return false;
  if(senderName === undefined || senderEmail === undefined || senderMessage === undefined) return false;
  if(senderName.length === 0 || senderEmail.length === 0 || senderMessage.length === 0 ) return false;

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(senderEmail).toLowerCase());


}


router.post('/send', function(req,res,next){

  var senderName = req.body.name;
  var senderEmail = req.body.email;
  var senderMessage = req.body.message;

  let valid = validateMessage(senderName,senderEmail,senderMessage);
  if(!valid) return res.status(400).end();

  let message = "From: " + senderName
               +"\nEmail: "+ senderEmail
               +"\nMessage:\n"+ senderMessage


  var mailOptions = {
    from: user,
    to: 'lulucaitcheon@gmail.com',
    subject: 'New Message from LuluEats',
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return res.status(400).end();
    } else {
      return res.status(200).json({message:info.response});
    }
  });


});


module.exports = router;
