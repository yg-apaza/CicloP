var express = require('express');
var passport = require('passport');
var Proyecto = require('../models/proyecto');
var Usuario = require('../models/usuario');
var router = express.Router();

router.post('/', function(req, res) {
	/*
	Usuario.findOne({username: req.user}, function(err, usuario){
		usuario.
	});
	Proyectos.find({}, function(err, proyectos){
		if(!err)
			res.json(proyectos);
	});*/
});

router.post('/agregar', function(req, res) {
	console.log(req.body.usuarios);
	
	var p = false, r = false;
	var proy = new Proyecto({	nombre: req.body.nombre,
								descripcion: req.body.descripcion,
								fculminacion: req.body.fechaCulminacion
								
							});
	proy.save(function(err){
		if (!err)
			p = true;
	});
	
	var i;
	for(i = 0; i < req.body.usuarios.length; i++)
	{

		Usuario.findOne({username: req.body.roles[i].username}, function (err, usuario) {
			console.log(usuario.notificaciones)
			//var nuevosRoles = usuario.roles;
			var nuevosRoles = [];
			nuevosRoles.push({rol: req.body.roles[i].rol, proyecto: proy._id});

			Usuario.update({username: usuario.username}, {roles: nuevosRoles}, function(err) {		
				if(!err)
					r = true;
			});
		});
	}
	
	return res.json({status: p && r});
});

module.exports = router;