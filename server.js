var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

require('dotenv').config();

const knex = require('./db/knex');

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");




var app = express();

cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = cloudinaryStorage({
cloudinary: cloudinary,
folder: "lulueats",
allowedFormats: ["jpg", "png"],
transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });


app.post('/image/masthead', parser.single("image"), (req, res) => {

  const image = {};
  image.image_url = req.file.url;
  image.image_id = req.file.public_id;

  knex('image')
    .insert(image, 'id')
    .then(() => {
       res.status(200);
       res.json(image);

    }).catch(function(error) {
        console.dir(error);
        res.status(500);
        res.json({});
    });

});



var postsRouter = require('./routes/posts');
//var imageRouter = require('./routes/image');
var authenticationRouter = require('./routes/authentication');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));



app.use('/posts', postsRouter);
//app.use('/image', imageRouter);
app.use('/authentication', authenticationRouter);


//TODO : REFRESH PROBLEM
//TODO : ROUTER PROBLE<
//TODO: PUT DB DETAILS IN .env
//TODO: PROD BUILD - KEYS AND .env
//TODO everything that should be in gitignore and env is in there, and stuff that shouldnt, isnt?
// TODO: Remove build from push -     "heroku-postbuild": "cd client && npm install --only=dev && npm install && npm run build"



if (process.env.NODE_ENV === 'production') {


  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));

  });
}









// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  next('error');
});






module.exports = app;
