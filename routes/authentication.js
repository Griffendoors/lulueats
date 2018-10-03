var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

var jwt = require('jsonwebtoken');

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



     //TODO: Check for emailAddress and password combo from users db
     var storedEmailAddress = 'test';
     var storedPassword = '1234';

     if(email === storedEmailAddress && password === storedPassword){
       var token = generateToken(email);

       res.status(200);
       res.json({ email: email, token: token});
     }
     else{
       res.status(403);
       res.json({});
     }
   }

});

router.post('/checkToken', function(req, res, next) {

   var token = req.body.token ;
   if (!token) {
     console.log("1");
     return res.status(401).json({message: "Must pass token"});
   }

  jwt.verify(token, process.env.JWT_SECRET, function(err, email) {
     if (err){
            console.dir(err);
       res.status(403);
       res.json({});
     }
     else{
       // Refresh that token
       let newToken = generateToken(email)
       res.status(200);
       console.log("3");
       res.json({
           email: email,
           token: token
       });
     }

   });

});

//TODO : TRY / CATCHES ON ALL OPERATIONS, AND RETURN SOMETHING USEFUL SO WHOLE APP DOESNT CRASH




// TODO: CREATE A USER DB TABLE
// TODO: USE STATUS codes here



function generateToken(email){
  var user = {
   email: this.email,
  };
  return token = jwt.sign(user, process.env.JWT_SECRET, {
     expiresIn:  60 * 60 * 24 // expires in 24 hours
  });
}



module.exports = router;
