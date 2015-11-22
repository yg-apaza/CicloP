/** Dependencias */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var fusuario = require('./routes/fusuario');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local' ).Strategy;

var app = express();

//View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/** Base de Datos */
//Mongoose
//Modelos

/** Configuraciones */

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({keys: ['secretkey1', 'secretkey2', '...']}));
app.use(express.static(path.join(__dirname, 'public')));

//passport
/*
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));*/
app.use(passport.initialize());
app.use(passport.session());

var Usuario = require('./models/usuario');

//configure passport
passport.use(new LocalStrategy(Usuario.authenticate()));
passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());

mongoose.connect('mongodb://localhost/ciclopbd');

app.use('/', index);
app.use('/fusuario/', fusuario);

/** Controladores de errores */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/** Exportar */
module.exports = app;