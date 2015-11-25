var express = require('express');
var passport = require('passport');
var Proyecto = require('../models/proyecto');
var Usuario = require('../models/usuario');
var router = express.Router();

router.post('/', function(req, res) {
	
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
		console.log(req.body.usuarios[i]);
		Usuario.findOne({username: req.body.usuarios[i].username}, function (err, usuario) {
			
			var nuevosRoles = usuario.roles;
			console.log(nuevosRoles);
			nuevosRoles.push({rol: req.body.usuarios[i].rol, proyecto: proy._id});
			Usuario.update({username: usuario.username}, {roles: nuevosRoles}, function(err) {		
				if(!err)
					r = true;
			});
		});
	}
	
	return res.json({status: p && r});
});

module.exports = router;