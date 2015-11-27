var express = require('express');
var passport = require('passport');
var Proyecto = require('../models/proyecto');
var Usuario = require('../models/usuario');
var router = express.Router();

router.post('/', function(req, res) {
	Usuario.findOne({username: req.user}, function(err, usuario){
		usuario.
	});
	Proyectos.find({}, function(err, proyectos){
		if(!err)
			res.json(proyectos);
	});
});

router.post('/agregar', function(req, res) {
	var p = false, r = false;
	if(req.body.nombre && req.body.descripcion && req.body.fechaCulminacion && req.body.usuarios)
	{
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
								var nuevosRoles = usuario.roles;
								nuevosRoles.push({rol: req.body.usuarios[i].rol, proyecto: proy._id});
								Usuario.update({username: usuario.username}, {roles: nuevosRoles}, function(err) {});
							}
						});
					})(i, req);
				}
				return res.json({status: true, id: proy._id});
			}
			else
				return res.json({status: false, id: null});
		});
	}
	else
		return res.json({status: false, id: null});
});

module.exports = router;