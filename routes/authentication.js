var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

const fs   = require('fs');
const jwt  = require('jsonwebtoken');

/* GET users listing. */
router.post('/login', function(req, res, next) {

   var email = req.body.email;
   var password = req.body.password;


  if (!email || !password){
    res.status(400);
    res.json({});
  }
  else{
     //trim spaces
     email = email.trim();
     password = password.trim();




     var storedEmailAddress = 'luluc';
     var storedPassword = 'lulu1234';

     if(email === storedEmailAddress && password === storedPassword){
       var token = generateToken(email);

       res.status(200);
       res.json({token: token});
     }
     else{
       res.status(403);
       res.json({});
     }
   }

});



router.post('/checkToken', function(req, res, next) {

    var publicKEY  = fs.readFileSync('./public.key', 'utf8');

   var token = req.body.token;


   if (!token) {
     return res.status(401).json({message: "Must pass token"});
   }

   var i  = 'GWA';          // Issuer
   var s  = 'lulucaitcheon@gmail.com';        // Subject
   var a  = 'http://lulueats'; // Audience

   var verifyOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "12h",
    algorithm:  ["RS256"]
   };


   //var token = req.headers['x-access-token'] || req.body.token
   jwt.verify(token,publicKEY,function(err,token){
    if(err){
      res.status(401).json({});
    }else{
      res.status(200).json({});
    }
  });


});





function generateToken(email){

  var payload = {
   email: email
  };

  var privateKEY  = fs.readFileSync('./private.key', 'utf8');


  var i  = 'GWA';          // Issuer
  var s  = 'lulucaitcheon@gmail.com';        // Subject
  var a  = 'http://lulueats'; // Audience

  var signOptions = {
   issuer:  i,
   subject:  s,
   audience:  a,
   expiresIn:  "24h",
   algorithm:  "RS256"
  };

  var token = jwt.sign(payload, privateKEY, signOptions);
  return token;

}

router.post('/logout', function(req, res, next) {

    var publicKEY  = fs.readFileSync('./public.key', 'utf8');

   var token = req.body.token;

   console.log("token" + token)


   if (!token) {
     return res.status(401).json({message: "Must pass token"});
   }

   var i  = 'GWA';          // Issuer
   var s  = 'lulucaitcheon@gmail.com';        // Subject
   var a  = 'http://lulueats'; // Audience

   var verifyOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "12h",
    algorithm:  ["RS256"]
   };


   //var token = req.headers['x-access-token'] || req.body.token
   jwt.verify(token,publicKEY,function(err,token){
    if(err){
      res.status(401).json({});
    }else{
      res.status(200).json({});
    }
  });


});



module.exports = router;
