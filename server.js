var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

require('dotenv').config();

var postsRouter = require('./routes/posts');
var authenticationRouter = require('./routes/authentication');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//console.log(process.env.DB_PASSWORD) // baconpancakes
//console.log(process.env.DB_USER)


app.use(express.static(path.join(__dirname, 'build')));

app.use('/posts', postsRouter);
app.use('/authentication', authenticationRouter);
/*


app.get('/ping', function (req, res) {
 return res.send('pong');
});
*/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


/* FOR PRODUCTION ONLY
app.use('/', express.static(`${__dirname}/client/build`));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/client/build', 'index.html'));
});
*/
/*
app.use('public', express.static(path.join(__dirname, 'public')));
// Always return the main index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});
*/

/*
app.use('/', express.static(`${__dirname}/client/public`));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/client/public', 'index.html'));
});
*/






/*
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
*/

module.exports = app;
