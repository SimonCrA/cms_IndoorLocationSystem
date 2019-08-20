var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const inicio = require('./controladores/calculos/timer')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
console.log(`aca ES EL APP`);
inicio.tiempoEspera();
var app = express();


// -------- Set up mongoose connection ---------------------------------------
console.log("Estableciendo conexion MongoDB Server...");
var mongoose = require('mongoose');
//var mongoDB = process.env.MONGODB_URI || 'mongodb://julio:Trackjy-2018@ds223812.mlab.com:23812/trackjy';
var mongoDB = 'mongodb://localhost:27017/indoorlocation';
//var mongoDB = 'mongodb://track2018:Track-2018@217.182.51.255:27017/trackerdb';
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log("Establecienda la conexion con MongoDB Server");
//----------------------------------------------------------------------------





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

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
  res.render('error');
});

module.exports = app;
