var async = require('async');
var express = require('express');
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
			{runValidators: true},
			function(err){		
				if(!err)
				{
					
					res.json({status: true});
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
				var usuariosValidos = [];
				var rolesValidos = [];
				
				async.each(
					req.body.usuarios,
					function(u, callback){
						Usuario.findOne({username: u.username}, function (err, usuario) {
							if(!err && usuario)
							{
								if(	usuario.username != req.user.username &&
									usuariosValidos.indexOf(usuario._id) == -1 &&
									(u.rol == '1' || 
									 u.rol == '2'))
								{
									usuariosValidos.push(usuario._id);
									rolesValidos.push(u.rol);
								}
							}
							callback();
						});
					},
					function(err) {
						if(!err)
						{
							console.log(rolesValidos.indexOf('2'));
							console.log(rolesValidos.lastIndexOf('2'));
							if( rolesValidos.indexOf('1') > -1 &&
								rolesValidos.indexOf('2') > -1 &&
								rolesValidos.indexOf('2') != rolesValidos.lastIndexOf('2'))
							{
								Usuario.findOne({username: req.user.username}, function (err, usuario) {
									if(!err && usuario)
									{
										var rol = new Rol({	idUsuario: usuario._id,
															idProyecto: proy._id,
															tipo: '3'
														});
										rol.save(function(err){});
									}
								});
								
								var i;
								for(i = 0; i < rolesValidos.length; i++)
								{
									var rol = new Rol({	idUsuario: usuariosValidos[i],
										idProyecto: proy._id,
										tipo: rolesValidos[i]
									});
									rol.save(function(err){});
								}
								req.session.idProy = proy._id;
								return res.json({status: true, id: proy._id, message: "Proyecto creado exitosamente."});
							}
							else
							{
								Proyecto.remove({_id: proy._id}, function(err){});
								return res.json({status: false, id: null, message: "Número de probadores o diseñadores incorrecto."});
							}
						}
						else
							return res.json({status: false, id: null, message: "No se creó el proyecto."});
				});
			}
			else
				return res.json({status: false, id: null, message: "No se creó el proyecto."});
		});
	}
	else
		return res.json({status: false, id: null, message: "Datos incompletos."});
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
		/*
		if(!err)
			return res.json({status: true, proyecto: p, usuarios: null});
		else
			return res.json({status: false, proyecto: null, usuarios: null});
		*/
		
		if(!err) {
			Rol.find({idProyecto: req.session.idProy}, function(err, roles) {
				var usuarios = [];
				if(! err) {
					async.each(
						roles,
						function(r, callback){
							Usuario.findOne({_id: r.idUsuario}, function (err, u) {
								if(!err && u)
									usuarios.push({username: u.username, rol: r.tipo});
								callback();
							});
						},
						function(err) {
							if(!err)
								return res.json({status: true, proyecto: p, usuarios: usuarios});
							else
								return res.json({status: false, proyecto: null, usuarios: usuarios});
						}
					);
				}
				else
					return res.json({status: false, proyecto: null, usuarios: null});
			});
		}
		else
			return res.json({status: false, proyecto: null, usuarios: null});
	});
});

// MODIFICAR - GUARDAR NUEVOS DATOS (USUARIOS, NOMBRE, ... )

router.post('/guardarId', function(req, res) {
	req.session.idProy = req.body.id;
	res.json({status: true});
});

module.exports = router;