var express = require('express');
var passport = require('passport');
var Usuario = require('../models/usuario');
var router = express.Router();
// var path = require('path');

router.post('/', function(req, res) {
	var i;
	var count = 0;
	for(i = 0; i < req.user.notificaciones.length; i++)
	{
		if(!req.user.notificaciones[i].leido)
			count++;
	}
	res.json({notificaciones: req.user.notificaciones, noleidos: count});
});

router.post('/agregar', function(req, res) {
	Usuario.findOne({ usuario: req.user.username }, function (err, usuario) {
		usuario.notificaciones.push(req.body.notificacion);
		usuario.save();
	});
});

router.post('/verTodo', function(req, res){
	Usuario.findOne({ username: req.user.username }, function (err, usuario) {
		
		var i;
		for(i = 0; i < usuario.notificaciones.length; i++)
			usuario.notificaciones[i].leido = true;
		usuario.save();
		res.json({status: true});
	});
});
module.exports = router;