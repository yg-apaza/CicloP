var express = require('express');
var passport = require('passport');
var util = require('./util');
var Usuario = require('../models/usuario');
var router = express.Router();

router.post('/', function(req, res) {
	var i;
	var count = 0;
	var notif = req.user.notificaciones;
	for(i = 0; i < notif.length; i++)
	{
		notif[i].fecha = util.fechaString(notif[i].fecha);
		if(!notif[i].leido)
			count++;
	}
	res.json({notificaciones: notif, noleidos: count});
});

router.post('/agregar', function(req, res) {
	Usuario.findOne({ usuario: req.user.username }, function (err, usuario) {
		usuario.notificaciones.push(req.body.notificacion);
		usuario.save();
	});
});

router.post('/verTodo', function(req, res) {
	Usuario.findOne({username: req.user.username}, function (err, usuario) {
		var i, nuevasNotificaciones = usuario.notificaciones;
		for(i = 0; i < nuevasNotificaciones.length; i++)
			nuevasNotificaciones[i].leido = true;
		
		Usuario.update({username: req.user.username}, {notificaciones: nuevasNotificaciones}, function(err){		
			if(err)
				res.json({status: false});
			else
				res.json({status: true});
		});
	});
});

module.exports = router;