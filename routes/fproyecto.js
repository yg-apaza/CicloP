var express = require('express');
var passport = require('passport');
var Proyecto = require('../models/proyecto');
var Usuario = require('../models/usuario');
var router = express.Router();

router.post('/', function(req, res) {
	
});

router.post('/agregar', function(req, res) {
	var p = false, r = false;
	var proy = new Proyecto({	nombre: req.body.nombre,
								descripcion: req.body.descripcion,
								fCreacion: req.body.fcreacion,
								fculminacion: req.body.fculminacion
							});
	proy.save(function(err){
		if (!err)
			p = true;
	});
	
	var i;
	for(i = 0; i < req.body.roles.length; i++)
	{
		Usuario.findOne({username: req.body.roles[i].username}, function (err, usuario) {
			console.log(usuario.notificaciones)
			var nuevosRoles = usuario.roles;
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