var async = require('async');
var express = require('express');
var passport = require('passport');
var Usuario = require('../models/usuario');
var Proyecto = require('../models/proyecto');
var Rol = require('../models/rol');
var router = express.Router();

router.post('/', function(req, res) {
	Proyecto.findOne({_id: req.body.id}, function(err, p) {
		if(!err)
			return res.json({status: true, proyecto: p});
		else
			return res.json({status: false, proyecto: null});
	});
});

router.post('/modificar', function(req, res) {
	if(req.body._id && req.body.nombre && req.body.descripcion && req.body.fCulminacion)
	{
		Proyecto.update(
			{_id: req.body._id},
			{
				nombre: req.body.nombre,
				descripcion: req.body.descripcion,
				fechaCulminacion: req.body.fechaCulminacion,
			},
			function(err){		
				if(!err)
				{
					res.json({status: true});
					//usuarios
				}
				else
					res.json({status: false});
			}
		);
	}
	else
		res.json({status: false});
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
					(function(i)
					{
						Usuario.findOne({username: req.body.usuarios[i].username}, function (err, usuario) {
							if(!err && usuario)
							{
								var rol = new Rol({	idUsuario: usuario._id,
													idProyecto: proy._id,
													tipo: req.body.usuarios[i].rol
												});
								rol.save(function(err){});
							}
						});
					})(i);
				}
				
				Usuario.findOne({username: req.user.username}, function (err, usuario) {
					if(!err && usuario)
					{
						var rol = new Rol({	idUsuario: usuario._id,
											idProyecto: proy._id,
											tipo: 3
										});
						rol.save(function(err){});
					}
				});
				
				req.session.idProy = proy._id;
				return res.json({status: true, id: proy._id});
			}
			else
				return res.json({status: false, id: null});
		});
	}
	else
		return res.json({status: false, id: null});
});

router.post('/verProyectos', function(req, res) {
	Rol.find({idUsuario: req.user._id}, function(err, roles){
		var nombresProyectos = [];
		async.each(roles, function(r, callback) {
			Proyecto.findOne({_id: r.idProyecto}, function (err, p) {
				if(!err)
				{
					nombresProyectos.push({nombre: p.nombre, id: p._id.toString()});
				}
				callback();
			});
		},
		function(err)
		{
			res.json(nombresProyectos);
		});
	});
});

router.post('/verUltimoProyecto', function(req, res) {
	Proyecto.findOne({_id: req.session.idProy}, function(err, p) {
		if(!err)
		{
			return res.json({status: true, proyecto: p});
		}
		else
			return res.json({status: false, proyecto: null});
	});
});

// MODIFICAR - GUARDAR NUEVOS DATOS (USUARIOS, NOMBRE, ... )
// VALIDAR ROLES DE USUARIOS ... (REPETIDOS)

router.post('/guardarId', function(req, res) {
	req.session.idProy = req.body.id;
	res.json({status: true});
});

module.exports = router;