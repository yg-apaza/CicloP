var express = require('express');
var path = require('path');
var router = express.Router();

//HOME
router.get('/', function (req, res) {
	if(req.user)
		res.sendFile(path.join(__dirname, '../views', 'home.html'));
	else
		res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/home', function (req, res) {
	res.redirect('/');
});

//LOGIN
router.get('/register', function (req, res) {
	if(!req.user)
		res.sendFile(path.join(__dirname, '../views', 'register.html'));
	else
		res.redirect('/');
});

router.get('/login', function (req, res) {
	if(!req.user)
		res.sendFile(path.join(__dirname, '../views', 'login.html'));
	else
		res.redirect('/');
});

router.get('/recuperar', function (req, res) {
	if(!req.user)
		res.sendFile(path.join(__dirname, '../views', 'recuperarCuenta.html'));
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
		res.sendFile(path.join(__dirname, '../views', 'listaChequeoAgregar.html'));
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


//SECCION
router.get('/seccion',function(req,res){
	if(req.user)
		res.sendFile(path.join(__dirname,'../views','seccion.html'));
	else 
		res.redirect('/');
})
module.exports = router;


//REPORTE
router.get('/reporte',function(req,res){
	if(req.user)
		res.sendFile(path.join(__dirname,'../views','reporte.html'));
	else 
		res.redirect('/');
})
module.exports = router;