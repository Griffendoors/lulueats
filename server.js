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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'build')));

app.use('/posts', postsRouter);
//app.use('/image', imageRouter);
app.use('/authentication', authenticationRouter);


//TODO : REFRESH ETC FUCKS static
//TODO: PUT DB DETAILS IN .env
//TODO: PROD BUILD - KEYS AND .env
//TODO everything that should be in gitignore and env is in there, and stuff that shouldnt, isnt?



if (process.env.NODE_ENV === 'production') {
    //Express will serve up production assets like main.js file
    app.use(express.static('client/build'));
    //Express will serve up html file if it doesn't recognize the route
    const path = require('path');
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    });
}






module.exports = app;
