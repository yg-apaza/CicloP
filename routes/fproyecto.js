var async = require('async');
var express = require('express');
var util = require('./util');
var Usuario = require('../models/usuario');
var Proyecto = require('../models/proyecto');
var Rol = require('../models/rol');
var router = express.Router();

router.post('/', function(req, res) {
	Proyecto.findOne({_id: req.body.id}, function(err, p) {
		for(var i = 0; i < p.etapas.length; i++)
			p.etapas[i].fInicio = util.fechaString(p.etapas[i].fInicio);
		if(!err)
			return res.json({status: true, proyecto: p});
		else
			return res.json({status: false, proyecto: null});
	});
});

router.post('/modificar', function(req, res) {
	if(req.body.datos) {
		Proyecto.update(
			{_id: req.body.datos._id},
			{
				nombre: req.body.datos.nombre,
				descripcion: req.body.datos.descripcion
			},
			{runValidators: true},
			function(err){
				if(!err)
				{
					if(req.body.nuevos)
					{
						var usuariosValidos = [];
						var rolesValidos = [];
						var anteriores = [];
						if(req.body.anteriores)
						{
							var i;
							for(i = 0; i < req.body.anteriores.length; i++)
								anteriores.push(req.body.anteriores[i].username);
						}
						
						async.each(
							req.body.nuevos,
							function(u, callback){
								Usuario.findOne({username: u.username}, function (err, usuario) {
									if(!err && usuario)
									{
										if(	usuario.username != req.user.username &&
											usuariosValidos.indexOf(usuario._id) == -1 &&
											anteriores.indexOf(usuario.username) == -1 &&
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
									var i;
									for(i = 0; i < rolesValidos.length; i++)
									{
										var rol = new Rol({	idUsuario: usuariosValidos[i],
											idProyecto: req.body.datos._id,
											tipo: rolesValidos[i]
										});
										rol.save(function(err){});
									}
									req.session.idProy = req.body.datos._id;
									return res.json({status: true, message: "Proyecto modificado exitosamente."});
								}
						});
					}
				}
				else
					return res.json({status: false, message: "No se modificó el proyecto."});
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
									fCulminacion: req.body.fechaCulminacion,
									fCulminacionReal: null,
									etapas: [{tipo: 1, estado: 1, puntaje: 0, fInicio: new Date()},
									         {tipo: 2, estado: 0, puntaje: 0, fInicio: null},
									         {tipo: 3, estado: 0, puntaje: 0, fInicio: null},
									         {tipo: 4, estado: 0, puntaje: 0, fInicio: null},
									         {tipo: 5, estado: 0, puntaje: 0, fInicio: null}],
								});
		proy.save(function(err) {
			if (!err)
			{
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
								var rol_usr = [];
								for(i = 0; i < rolesValidos.length; i++)
								{
									var rol = new Rol({	idUsuario: usuariosValidos[i],
										idProyecto: proy._id,
										tipo: rolesValidos[i]
									});
									rol_usr.push({tipo: rolesValidos[i], id: usuariosValidos[i]});
									rol.save(function(err){});
								}

								async.eachSeries(
									rol_usr,
									function(r, callback)
									{
										util.enviarNotificacion(2, [proy.nombre, (r.tipo == '2')?"Probador":"Diseñador"], r.id, false, function(err) {});
										callback();
									},
									function(err)
									{
										req.session.idProy = proy._id;
										return res.json({status: true, message: "Proyecto creado exitosamente."});
									}
								);
							}
							else
							{
								Proyecto.remove({_id: proy._id}, function(err){});
								return res.json({status: false, message: "Número de probadores o diseñadores incorrecto."});
							}
						}
						else
							return res.json({status: false, message: "No se creó el proyecto."});
				});
			}
			else
				return res.json({status: false, message: "No se creó el proyecto."});
		});
	}
	else
		return res.json({status: false, message: "Datos incompletos."});
});

router.post('/verProyectos', function(req, res) {
	Rol.find({idUsuario: req.user._id}, function(err, roles){
		var nombresProyectos = [];
		async.eachSeries(roles, function(r, callback) {
			Proyecto.findOne({_id: r.idProyecto}, function (err, p) {
				if(!err)
					nombresProyectos.push({nombre: p.nombre, id: p._id.toString()});
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
		if(!err) {
			Rol.find({idProyecto: req.session.idProy}, function(err, roles) {
				var usuarios = [];
				if(! err) {
					async.each(
						roles,
						function(r, callback) {
							Usuario.findOne({_id: r.idUsuario}, function (err, u) {
								if(!err && u && r.tipo != '3')
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
		//
	});
});

// MODIFICAR - GUARDAR NUEVOS DATOS (USUARIOS, NOMBRE, ... )

router.post('/guardarId', function(req, res) {
	req.session.idProy = req.body.id;
	res.json({status: true});
});

module.exports = router;