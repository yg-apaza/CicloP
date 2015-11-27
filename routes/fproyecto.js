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
				(function(i, req)
				{
					Usuario.findOne({username: req.body.usuarios[i].username}, function (err, usuario) {
						if(!err && usuario)
						{
							console.log(nuevosRoles)
							var nuevosRoles = usuario.roles;
							nuevosRoles.push({rol: req.body.usuarios[i].rol, proyecto: proy._id});
							Usuario.update({username: usuario.username}, {roles: nuevosRoles}, function(err) {});
						}
					});
				})(i, req);
			}
			return res.json({status: true});
		}
	});
	return res.json({status: false, message: ""})
});

module.exports = router;