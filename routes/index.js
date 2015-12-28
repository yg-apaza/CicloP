var express = require('express');
var nodemailer = require('nodemailer');
var path = require('path');
var router = express.Router();

//HOME
router.get('/', function (req, res) {
	if(req.user)
		res.sendFile(path.join(__dirname, '../views', 'principal.html'));
	else
		res.sendFile(path.join(__dirname, '../views', 'principalPortal.html'));
});

router.get('/home', function (req, res) {
	res.redirect('/');
});

//CUENTA
router.get('/register', function (req, res) {
	if(!req.user)
		res.sendFile(path.join(__dirname, '../views', 'cuentaRegistrar.html'));
	else
		res.redirect('/');
});

router.get('/ingresar', function (req, res) {
	if(!req.user)
		res.sendFile(path.join(__dirname, '../views', 'cuentaIngresar.html'));
	else
		res.redirect('/');
});

router.get('/recuperar', function (req, res) {
	if(!req.user)
		res.sendFile(path.join(__dirname, '../views', 'cuentaRecuperar.html'));
	else
		res.redirect('/');
});

router.get('/cambiarClave', function (req, res) {
	if(!req.user)
		res.sendFile(path.join(__dirname, '../views', 'cuentaCambiarClave.html'));
	else
		res.redirect('/');
});

//PROYECTO
router.get('/nuevoProyecto', function (req,res) {
	if(req.user)
		res.sendFile(path.join(__dirname,'../views','proyectoNuevo.html'));		
	else
		res.redirect('/');
});

router.get('/verProyecto', function (req, res) {
	if(req.user)
		res.sendFile(path.join(__dirname, '../views', 'proyectoVer.html'));
	else
		res.redirect('/');
});

router.get('/modificarProyecto', function (req, res) {
	if(req.user)
		res.sendFile(path.join(__dirname, '../views', 'proyectoModificar.html'));
	else
		es.redirect('/');
});

//ETAPA
router.get('/etapa', function (req, res) {
	if(req.user)
		res.sendFile(path.join(__dirname, '../views', 'etapa.html'));
	else
		res.redirect('/');
});

//LISTAS DE CHEQUEO
router.get('/agregarLista', function (req, res) {
	if(req.user)
		res.sendFile(path.join(__dirname, '../views', 'etapaSeccionAgregarLista.html'));
	else
		res.redirect('/');
});

//NOTIFICACIONES
router.get('/notificaciones', function (req, res) {
	if(req.user)
		res.sendFile(path.join(__dirname, '../views', 'notificaciones.html'));
	else
		res.redirect('/');
});

//AYUDA
router.get('/ayuda', function (req, res) {
	if(req.user)
		res.sendFile(path.join(__dirname, '../views', 'ayuda.html'));
	else
		res.redirect('/');
});

//SECCION
router.get('/seccion', function(req,res){
	if(req.user)
		res.sendFile(path.join(__dirname,'../views','etapaSeccionEditar.html'));
	else 
		res.redirect('/');
})

router.get('/seccionProbador', function(req,res){
	if(req.user)
		res.sendFile(path.join(__dirname,'../views','etapaSeccionProbar.html'));
	else 
		res.redirect('/');
});

//REPORTE
router.get('/reporte', function(req,res){
	if(req.user)
		res.sendFile(path.join(__dirname,'../views','proyectoReporte.html'));
	else 
		res.redirect('/');
});

router.post('/dejarMensaje', function(req, res){

	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'motsa.software@gmail.com',
	        pass: 'motonmatoamotita'
	    }
	});
	var mailOptions = {
		    from: 'MOT S.A.',
		    to: 'motsa.software@gmail.com',
		    subject: "Mensaje de usuario",
		    text: "",
		    html:
		    	'<h1><span style="font-family:verdana,geneva,sans-serif;"><strong>Nuevo mensaje de usuario</strong></span></h1>' +
		    	'<p><span style="font-family:verdana,geneva,sans-serif;"><strong>Nombre: </strong>' + req.body.nombre + '</span></p>' +
		    	'<p><span style="font-family:verdana,geneva,sans-serif;"><strong>Correo: </strong>' + req.body.correo + '</span></p>' +
		    	'<p><span style="font-family:verdana,geneva,sans-serif;"><strong>Mensaje:</strong></span></p>' +
		    	'<p><span style="font-family:verdana,geneva,sans-serif;"> ' + req.body.mensaje + '</span></p>'
	};
	transporter.sendMail(mailOptions, function(err, info) {
		if(!err)
			res.json({status: true});
		else
			res.json({status: false});
	});
});

module.exports = router;