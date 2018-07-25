var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

/* GET users listing. */
router.post('/login', function(req, res, next) {

   var loginObject = {
     status: false,
     token: null
   }

   var emailAddress = req.body.emailAddress;
   var password = req.body.password;

   //Check for emailAddress and password combo from users db
   var storedEmailAddress = "lulucaitcheon@gmail.com";
   var storedPassword = "goofy1234s";

   if(emailAddress === storedEmailAddress && password === storedPassword){
     var token = newLoggedInToken();
     loginObject['token'] = token;
   }

   res.json(loginObject);
});


function newLoggedInToken = () => {
  // TOKEN LIBRARY
  // SESSION, ALL THAT SECURITY SHIT?
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ";
}



module.exports = router;
