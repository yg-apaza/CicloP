var express = require('express');
var path = require('path');
var router = express.Router();


router.get('/', function (req, res) {
	if(req.user)
		res.sendFile(path.join(__dirname, '../views', 'home.html'));
	else
		res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/home', function (req, res) {
	res.redirect('/');
});

router.get('/login', function (req, res) {
	if(!req.user)
		res.sendFile(path.join(__dirname, '../views', 'login.html'));
	else
		res.redirect('/');
});

router.get('/nuevoProyecto', function (req,res) {
	if(req.user)
		res.sendFile(path.join(__dirname,'../views','nuevoProyecto.html'));		
	else
		res.redirect('/');
});
router.get('/verProyecto', function (req, res) {
	if(req.user)
		res.sendFile(path.join(__dirname, '../views', 'etapas.html'));
	else
		res.redirect('/');
});

router.get('/register', function (req, res) {
	if(!req.user)
		res.sendFile(path.join(__dirname, '../views', 'register.html'));
	else
		res.redirect('/');
});

router.get('/modificarProyecto', function (req, res) {
	if(req.user)
		res.sendFile(path.join(__dirname, '../views', 'modificarProyecto.html'));
	else
		res.redirect('/');
});

module.exports = router;