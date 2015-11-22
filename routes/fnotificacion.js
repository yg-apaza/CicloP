var express = require('express');
var passport = require('passport');
var Usuario = require('../models/usuario');
var router = express.Router();
// var path = require('path');

router.post('/', function(req, res) {
	if(req.body.num === 0)
		res.json(req.user.notificaciones);
	else
		res.json(req.user.notificaciones.slice(req.user.notificaciones.length - req.num, req.user.notificaciones.length));
});

router.post('/agregar', function(req, res) {
	Usuario.findOne({ usuario: req.user.username }, function (err, usuario) {
		usuario.notificaciones.push(req.body.notificacion);
		usuario.save();
	});
});

module.exports = router;