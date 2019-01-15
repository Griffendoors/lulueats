var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

require('dotenv').config();
const knex = require('./db/knex');

var app = express();

var postsRouter = require('./routes/posts');
var imageRouter = require('./routes/image');
var authenticationRouter = require('./routes/authentication');
var contactRouter = require('./routes/contact');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use('/posts', postsRouter);
app.use('/image', imageRouter);
app.use('/authentication', authenticationRouter);
app.use('/contact', contactRouter);


if(process.env.NODE_ENV === "production"){

  app.use('/static',express.static(path.join(__dirname, '/client/build/static')));
  app.use('/css',express.static(path.join(__dirname, '/client/build/css')));
  app.use('/img',express.static(path.join(__dirname, '/client/build/img')));
  app.use('/js',express.static(path.join(__dirname, '/client/build/js')));
  app.use('/vendor',express.static(path.join(__dirname, '/client/build/vendor')));
  app.use('/scss',express.static(path.join(__dirname, '/client/build/scss')));

  // Handle React routing, return all requests to React app
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname +'/client/build/index.html'));

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
