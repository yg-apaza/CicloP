var async = require('async');
var crypto = require('crypto');
var express = require('express');
var fs = require('fs');
var path = require('path');
var util = require('./util');
var Lista = require('../models/lista');
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
							{
								for(var i = 0; i < p.etapas.length; i++)
									p.etapas[i].fInicio = util.fechaString(p.etapas[i].fInicio);
								p.fCulminacion = util.fechaString(new Date(p.fCulminacion));
								return res.json({status: true, proyecto: p, usuarios: usuarios});
							}
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

router.post('/reporte', function(req, res) {
	if(req.session.idProy)
	{
		var content = fs.readFileSync(path.join(__dirname, '../template.html'), 'utf8');
			dataReporte(req.session.idProy, function(data){
				var jsreport = require('jsreport-core')();
				jsreport.init().then(function () {
				   jsreport.render({ 
				       template: { 
				           content: content, 
				           engine: 'jsrender', 
				           recipe: 'phantom-pdf'
				        },
				        data: data
					}).then(function(out) {
						out.stream.pipe(fs.createWriteStream(path.join(__dirname, '../public', 'reporte.pdf')));
						res.json({status: true, archivo: ""})
					}).catch(function(e) {    
						res.json({status: false, archivo: ""})
					});
				}).catch(function(e) {
					res.json({status: false, archivo: ""})
				});
			});
	}
});

function dataReporte(idProy, cb)
{
	var data = {};
	Proyecto.findOne({_id: idProy}, function(err, p) {
		data.nombreProyecto = p.nombre;
		data.fechaActual = util.fechaString(new Date());
		data.descripcion = p.descripcion;
		data.fechaFinal = util.fechaString(p.fCulminacionReal);
		Rol.find({idProyecto: idProy}, function(err, roles){
			var participantes = [];
			async.eachSeries(
				roles,
				function(r, callback) {
					Usuario.findOne({_id: r.idUsuario}, function(err, u){
						participantes.push({nombre: u.nombre + " " + u.apellidos, rol: (r.tipo == '1')?"Diseñador":(r.tipo == '2')?"Probador":"Coordinador"});
						callback();
					});
				},
				function(err) {
					data.participantes = participantes;
					getListasReporte(idProy, function(dataListas) {
						data.puntaje1 = dataListas[0].puntaje;
						data.estado1 = dataListas[0].estado;
						data.puntaje2 = dataListas[1].puntaje;
						data.estado2 = dataListas[1].estado;
						data.puntaje3 = dataListas[2].puntaje;
						data.estado3 = dataListas[2].estado;
						data.puntaje4 = dataListas[3].puntaje;
						data.estado4 = dataListas[3].estado;
						data.puntaje5 = dataListas[4].puntaje;
						data.estado5 = dataListas[4].estado;
						data.puntaje6 = dataListas[5].puntaje;
						data.estado6 = dataListas[5].estado;
						data.puntaje7 = dataListas[6].puntaje;
						data.estado7 = dataListas[6].estado;
						data.puntaje8 = dataListas[7].puntaje;
						data.estado8 = dataListas[7].estado;
						cb(data);
					});
				}
			);
		});
	});
}

function getListasReporte(idProy, cb)
{
	var dataListas = [null, null, null, null, null, null, null, null];
	Lista.find({idProyecto: idProy}).sort({fCreacion : -1}).exec( function(err, listas) {
		async.eachSeries(
			listas,
			function(l, callback) {
				if(!dataListas[l.tipo - 1])
				{
					var estado = "";
					switch(l.estado)
					{
						case 0:
							estado = "No publicado";
							break;
						case 1:
							estado = "Publicado";
							break;
						case 2:
							estado = "En proceso";
							break;
						case 3:
							estado = "Aprobado";
							break;
						case 4:
							estado = "Desaprobado";
							break;
					}
					dataListas[l.tipo - 1] = {puntaje: (l.puntaje/l.puntajeMaximo * 100).toFixed(2) + '%', estado: estado};
				}
				callback();
			},
			function(err)
			{
				for(var i = 0; i < dataListas.length; i++)
					if(!dataListas[i])
						dataListas[i] = {puntaje: '-', estado: '-'};
				cb(dataListas);
			}
		);
	});
}

module.exports = router;