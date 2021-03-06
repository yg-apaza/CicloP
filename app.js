/** Dependencias */
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var expressSession = require('express-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local' ).Strategy;
var MongoStore = require('connect-mongo')(expressSession);

/** Rutas */
var index = require('./routes/index');
var fusuario = require('./routes/fusuario');
var fnotificacion = require('./routes/fnotificacion');
var fproyecto = require('./routes/fproyecto');
var flista = require('./routes/flista');
var app = express();

/** View Engine Setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/** Conexion con la base de datos */
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/ciclopbd');

/** Configuraciones Generales*/
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    key: 'session',
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(express.static(path.join(__dirname, 'public')));

/** Configuracion de Passport js */
app.use(passport.initialize());
app.use(passport.session());
var Usuario = require('./models/usuario');
passport.use(new LocalStrategy(Usuario.authenticate()));
passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());

/** Rutas POST*/
app.use('/', index);
app.use('/fusuario/', fusuario);
app.use('/fnotificacion/', fnotificacion);
app.use('/fproyecto/', fproyecto);
app.use('/flista', flista);

/** Servidor del reporte */
/*
jsreport.init().then(function () {
   jsreport.render({ 
       template: { 
           content: '<h1>Hello {{:foo}}</h1>', 
           engine: 'jsrender', 
           recipe: 'phantom-pdf'
        }, 
        data: { 
            foo: "world"
        }
	}).then(function(out) {
		out.stream.pipe(fs.createWriteStream(path.join(__dirname, 'public', 'helloworld.pdf')));
	}).catch(function(e) {    
		console.log(e.message);
	});
}).catch(function(e) {
	  console.log(e)
})
*/
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
/*
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
*/
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