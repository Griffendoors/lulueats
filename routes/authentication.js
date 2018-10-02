var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

var jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/login', function(req, res, next) {

   var loginObject = {
     status: false,
     token: null
   }

   var emailAddress = req.body.email;
   var password = req.body.password;


   //Check for emailAddress and password combo from users db
   var storedEmailAddress = 'test';
   var storedPassword = '1234';

   if(emailAddress === storedEmailAddress && password === storedPassword){
     var token = generateToken(req.body);
     console.log("token: " +token );
     res.status(200)
     res.json({token:token});
   }
   else{
     res.status(400)
     res.json({});
   }
   // TODO: res. status 500?
});

router.post('/checkToken', function(req, res, next) {

   let token = req.body.token;
   let authorized = authorizeToken(token);


   if(authorized){
     res.status(200);
     res.json({});
   }
   else {
     res.status(400).end();
     res.json({});
   }

});

//TODO : TRY / CATCHES ON ALL OPERATIONS, AND RETURN SOMETHING USEFUL SO WHOLE APP DOESNT CRASH


function authorizeToken(token) {
  // TODO : COMPLETE THESE FUNCTIONS WITH JWT TOKENS
  return true;
}


// TODO: CREATE A USER DB TABLE
// TODO: USE STATUS codes here



function generateToken(user) {
  //1. Dont use password and other sensitive fields
  //2. Use fields that are useful in other parts of the
  //app/collections/models
  console.dir(user)
  var u = {
   email: user.email,
  };
  return token = jwt.sign(u, process.env.JWT_SECRET, {
     expiresIn: 60 * 60 * 12 // expires in 12 hours
  });
}



module.exports = router;
