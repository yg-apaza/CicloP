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
	console.log(req.body);
	var p = false, r = false;
	var proy = new Proyecto({	nombre: req.body.nombre,
								descripcion: req.body.descripcion,
								fCulminacion: req.body.fechaCulminacion
							});
	proy.save(function(err) {
		if (!err)
		{
			var i;
			for(i = 0; i < req.body.usuarios.length; i++)
			{
				Usuario.findOne({username: req.body.roles[i].username}, function (err2, usuario) {
					if(!err2)
					{
						console.log(usuario.notificaciones)
						var nuevosRoles = usuario.roles;
						nuevosRoles.push({rol: req.body.roles[i].rol, proyecto: proy._id});
	
						Usuario.update({username: usuario.username}, {roles: nuevosRoles}, function(err3) {		
							if(!err3)
								return res.json({status: true, message: ""});
						});
					}
				});
			}
		}
	});
	return res.json({status: false, message: ""})
});

module.exports = router;