
const bodyParser = require('body-parser')


const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const fileUpload = require('express-fileupload');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const postRouter = require('./routes/post');
const putRouter = require('./routes/put');
const deleteRouter = require('./routes/delete');
const getRouter = require('./routes/get');
const variables = require('./controladores/variables')
const apiUser = require('./routes/usuario')
const loginRouter = require('./routes/login')
const uploadRouter = require('./routes/upload')
const clientRouter = require('./routes/client')
const imgRouter = require('./routes/imagenes')
const {MakelogSistem, logSistem} =  require('./controladores/write_Log')
let {nameFile} = require('./controladores/variables')
var cors = require('cors');
console.log(`Server`+` ON . . .`.green);


var app = express();


const {validacion_Trilateracion} = require('./controladores/calculos/validacion');
const {iniciarValidacion} = require('./controladores/calculos/timer')


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
console.log("Establecida la conexion con MongoDB Server: On");
//----------------------------------------------------------------------------





// iniciarValidacion()





app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({ useTempFiles: true }));

// app.use(fileUpload({
//   limits: { fileSize: 50 * 1024 * 1024 },
// }));

app.use(session({
  secret: 'Guardo un secreto',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: mongoDB,
    autoReconnect: true
  })
}))

app.use(passport.initialize())
app.use(passport.session())

MakelogSistem('Inicio app').then(archivo=>{
  console.log(`Archivo creado ${archivo}`)
  nameFile[0]= archivo  
  console.log(nameFile);
  
})
.catch(e=> console.log(e))





app.post('/post', (req, res) => {
  console.log(req.body[0].rssi)
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(cors());


// validacion_Trilateracion();


app.use('/', indexRouter);
app.use('/users', apiUser);
app.use('/api', apiRouter);
app.use('/post', postRouter);
app.use('/put', putRouter);
app.use('/delete', deleteRouter);
app.use('/get', getRouter);
app.use('/login', loginRouter);
app.use('/client', clientRouter);
app.use('/', imgRouter);

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



