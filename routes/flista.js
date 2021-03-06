var async = require('async');
var express = require('express');
var router = express.Router();
var util = require('./util');
var Modelo = require('../models/modelo');
var Lista = require('../models/lista');
var Rol = require('../models/rol');
var Usuario = require('../models/usuario');
var Proyecto = require('../models/proyecto');

router.post('/rol', function(req, res) {
	Rol.findOne({idUsuario: req.user._id, idProyecto: req.session.idProy}, function(err, rol) {
		if(rol.tipo != '0')
		{
			Lista.find({etapa: req.session.etapa, idProyecto: req.session.idProy}, function(err, ls) {
				var lista = [];
				async.each(
					ls,
					function(l, callback)
					{
						switch(rol.tipo)
						{
							case '1':
								if(req.user._id.toString() == l.disenador)
									lista.push({id: l._id, nombre: l.nombre, fecha: util.fechaString(new Date(l.fCulminacion)), estado: l.estado, puntaje: (l.puntaje / l.puntajeMaximo) * 100, pertenece: true});
								else
									lista.push({id: l._id, nombre: l.nombre, fecha: util.fechaString(new Date(l.fCulminacion)), estado: l.estado, puntaje: (l.puntaje / l.puntajeMaximo) * 100, pertenece: false});
								break;
							case '2':
								if(req.user._id.toString() == l.probador && l.estado != 0)
									lista.push({id: l._id, nombre: l.nombre, fecha: util.fechaString(new Date(l.fCulminacion)), estado: l.estado, puntaje: (l.puntaje / l.puntajeMaximo) * 100});
								break;
							case '3':
								lista.push({id: l._id, nombre: l.nombre, fecha: util.fechaString(new Date(l.fCulminacion)), estado: l.estado, puntaje: (l.puntaje / l.puntajeMaximo) * 100});
								break;
						}
						callback();
					},
					function(err)
					{
						if(!err)
							res.json({status: true, rol: rol.tipo, listas: lista});
						else
							res.json({status: false, rol: null, listas: null});
					}
				);
			});
		}
	});
});

// Arreglar listas disponibles

router.post('/listasDisponibles', function(req, res) {
	var total = [false, false];
	switch(req.session.etapa)
	{
		// No es findOne
		case 1: 
			Lista.findOne({tipo: 1, idProyecto: req.session.idProy}, function(err, l1) {
				if(!err)
				{
					if(!l1 || l1.estado == 4)
						res.json({status: true, listas: [1]});
					else
						res.json({status: true, listas: []});
				}
				else
					res.json({status: false, listas: null});
			});
		break;

		case 2:
			Lista.find({$or:[{tipo: 2}, {tipo: 3}], idProyecto: req.session.idProy}, function(err, l23) {
				var send = [true, true];
				if(!err)
				{
					if(!l23)
						l23 = [];
					async.each(
						l23,
						function(l, callback)
						{
							if(l.estado != 4)
								send[l.tipo - 2] = false;
							callback()
						},
						function(err)
						{
							var listas = [];
							var i;
							for(i = 0; i < send.length; i++)
								if(send[i]) listas.push(i + 2);
							res.json({status: true, listas: listas});
						}
					);
				}
				else
					res.json({status: false, listas: null});
			});
		break;
		
		case 3:
			Lista.find({$or:[{tipo: 4}, {tipo: 5}], idProyecto: req.session.idProy}, function(err, l45) {
				var send = [true, true];
				if(!err)
				{
					if(!l45)
						l45 = [];
					async.each(
						l45,
						function(l, callback)
						{
							if(l.estado != 4)
								send[l.tipo - 4] = false;
							callback()
						},
						function(err)
						{
							var listas = [];
							var i;
							for(i = 0; i < send.length; i++)
								if(send[i]) listas.push(i + 4);
							res.json({status: true, listas: listas});
						}
					);
				}
				else
					res.json({status: false, listas: null});
			});
		break;
		
		case 4:
			Lista.find({$or:[{tipo: 6}, {tipo: 7}], idProyecto: req.session.idProy}, function(err, l67) {
				var send = [true, true];
				if(!err)
				{
					if(!l67)
						l67 = [];
					async.each(
						l67,
						function(l, callback)
						{
							if(l.estado != 4)
								send[l.tipo - 6] = false;
							callback()
						},
						function(err)
						{
							var listas = [];
							var i;
							for(i = 0; i < send.length; i++)
								if(send[i]) listas.push(i + 6);
							res.json({status: true, listas: listas});
						}
					);
				}
				else
					res.json({status: false, listas: null});
			});
		break;
		
		case 5: 
			Lista.findOne({tipo: 8, idProyecto: req.session.idProy}, function(err, l8) {
				if(!err)
				{
					if(!l8 || l8.estado == 4)
						res.json({status: true, listas: [8]});
					else
						res.json({status: true, listas: []});
				}
				else
					res.json({status: false, listas: null});
			});
		break;
	}
});

router.post('/probadores', function(req, res) {
	Rol.find({idProyecto: req.session.idProy, tipo: '2'}, function(err, roles) {
		var probadores = [];
		if(!err){
			async.eachSeries(
				roles,
				function(r, callback)
				{
					Usuario.findOne({_id: r.idUsuario}, function(err, u) {
						probadores.push({username: u.username, id: r.idUsuario});
						callback();
					});
				},
				function(err)
				{
					res.json({status: true, probadores: probadores});
				}
			);
		}
		else
			res.json({status: false, probadores: null})
	});
});

// datos pelados
router.post('/agregar', function(req, res) {
	if(req.body.numLista && req.body.idProbador && req.body.fCulminacion) {
		Modelo.findOne({tipo: req.body.numLista}, function(err, modelo) {			
			var lista = new Lista({
				idProyecto: 	req.session.idProy,
				tipo: 			modelo.tipo,
				etapa: 			modelo.etapa,
				nombre: 		modelo.nombre,
				estado: 		0,
				disenador: 		req.user._id,
				probador: 		req.body.idProbador,
				puntaje:		0,
				puntajeMinimo:	puntajeMinimo(modelo.secciones),
				puntajeMaximo:	puntajeMaximo(modelo.secciones),
				fCulminacion:	req.body.fCulminacion,
				secciones:		modelo.secciones
			});

			if(!req.body.reutilizar)
			{
				lista.save(function(err) {
					if(!err)
					{
						req.session.idLista = modelo._id;
						res.json({status: true});
					}
					else
						res.json({status: false});
				});
			}
			else
			{
				Lista.findOne({idProyecto: req.session.idProy, tipo: modelo.tipo, estado: 4}).sort({fCreacion : -1}).exec( function(err, lista2) {
					if(!err)
					{
						var i, j;
						for(i = 0; i < lista2.secciones.length; i++)
							for(j = 0; j < lista2.secciones[i].items.length; j++)
								lista.secciones[i].items[j].seleccionado = lista2.secciones[i].items[j].seleccionado;
						lista.puntajeMaximo = puntajeMaximo(lista.secciones);
						lista.puntajeMinimo = puntajeMinimo(lista.secciones);
						lista.save();
						req.session.idLista = modelo._id;
						res.json({status: true});
					}
					else
						return res.json({status: false});
				});
			}
		});
	}
});

router.post('/guardarEtapa', function(req, res) {
	req.session.etapa = req.body.etapa;
	res.json({status: true});
});

router.post('/verEtapa', function(req, res){
	res.json({status: true, etapa: req.session.etapa});
});

router.post('/guardarIdLista', function(req, res) {
	req.session.idLista = req.body.idLista;
	res.json({status: true});
});

router.post('/getLista', function(req, res) {
	Lista.findOne({_id: req.session.idLista}, function(err, lista) {
		res.json({status: true,nombreLista: lista.nombre, secciones: lista.secciones});
	});
});

router.post('/reutilizar', function(req, res){
	if(req.body.numLista)
	{
		Lista.findOne({idProyecto: req.session.idProy, tipo: req.body.numLista, estado: 4}, function(err, lista) {
			if(!err)
			{
				if(lista)
					return res.json({status: true, reutilizar: true});
				else
					return res.json({status: true, reutilizar: false});
			}
			else
				return res.json({status: false, reutilizar: false});
		});
	}
});

router.post('/guardarCambios', function(req, res) {
	if(req.body.secciones)
	{
		Lista.findOne({_id: req.session.idLista}, function(err, lista) {
			lista.secciones = req.body.secciones;
			Rol.findOne({idUsuario: req.user._id, idProyecto: req.session.idProy}, function(err, rol) {
				if(rol.tipo == '1')
				{
					lista.estado = 0;
					lista.puntaje = 0;
					lista.puntajeMinimo = puntajeMinimo(req.body.secciones);
					lista.puntajeMaximo = puntajeMaximo(req.body.secciones);
				}
				else if(rol.tipo == '2')
				{
					lista.estado = 2;
					lista.puntaje = puntajeActual(req.body.secciones);
				}
				lista.save();
				res.json({status: true});
			});
			
		});
	}
	else
		res.json({status: false});
});

router.post('/publicar', function(req, res) {
	console.log('dd: ');
	console.log(req.body.secciones.items);
	if(req.body.secciones)
	{
		Lista.findOne({_id: req.session.idLista}, function(err, lista) {
			lista.secciones = req.body.secciones;
			Rol.findOne({idUsuario: req.user._id, idProyecto: req.session.idProy}, function(err, rol) {
				if(rol.tipo == '1')
				{
					lista.estado = 1;
					lista.puntaje = 0;
					lista.puntajeMinimo = puntajeMinimo(req.body.secciones);
					lista.puntajeMaximo = puntajeMaximo(req.body.secciones);
					lista.save();
					res.json({status: true});
				}
				else if(rol.tipo == '2')
				{
					lista.puntaje = puntajeActual(req.body.secciones);
					if(verificarObligatorias(req.body.secciones) && lista.puntaje >= (lista.puntajeMinimo/lista.puntajeMaximo))
					{
						lista.estado = 3;
						var tipos = [];
						switch(req.session.etapa)
						{
							case 1:
								tipos = [1];
								break;
							case 2:
								tipos = [2, 3];
								break;
							case 3:
								tipos = [4, 5];
								break;
							case 4:
								tipos = [6, 7]
								break;
							case 5:
								tipos = [8];
								break;
						}
						lista.save(function(err){
							if(!err)
								listaAprobada(req.session.idProy, tipos, function(puntaje){
									if(puntaje != -1)
									{
										Proyecto.findOne({_id: req.session.idProy}, function(err, p){
											p.etapas[req.session.etapa - 1].estado = 2;
											p.etapas[req.session.etapa - 1].puntaje = puntaje * 100;
											fFinal = p.fCulminacionReal;
											if(req.session.etapa != 5)
											{
												p.etapas[req.session.etapa].estado = 1;
												p.etapas[req.session.etapa].fInicio = new Date();
											}
											else
												fFinal = new Date();
											
											nuevasEtapas = p.etapas;
											Proyecto.update({_id: req.session.idProy}, {etapas: nuevasEtapas, fCulminacionReal: fFinal}, function(err) {
												Rol.find({idProyecto: req.session.idProy}, function(err, roles){
													if(!err)
													{
														var ids = [];
														for(var i = 0; i < roles.length; i++)
															ids.push(roles[i].idUsuario);
														var etapa = "";
														switch(req.session.etapa)
														{
															case 1:
																etapa = "Toma y definición de requisitos";
																break;
															case 2:
																etapa = "Análisis y diseño"
																break;
															case 3:
																etapa = "Codificación"
																break;
															case 4:
																etapa = "Pruebas"
																break;
															case 5:
																etapa = "Implantación y mantenimiento"
																break;
														}

														if(req.session.etapa != 5)
															util.enviarNotificacion(3, [etapa, p.nombre], ids, true, function(err){
																res.json({status: true});
															});
														else
															util.enviarNotificacion(5, [p.nombre], ids, true, function(err){
																res.json({status: true});
															});
													}
													else
														res.json({status: false});
												});
											});
										});
									}
									else
										res.json({status: true});
								});
							else
								res.json({status: false});
						});
					}
					else
					{
						lista.estado = 4;
						lista.save();
						res.json({status: true});
					}
				}
			});
		});
	}
	else
		res.json({status: false});
});

function puntajeActual(secciones) {
	var count = 0;
	for(var i = 0; i < secciones.length; i++)
		for(var j = 0; j < secciones[i].items.length; j++)
		{
			if(secciones[i].items[j].seleccionado && secciones[i].items[j].estado)
				count += secciones[i].items[j].ponderacion;
		}
	return count;
}

function puntajeMinimo(secciones) {
	var count = 0;
	for(var i = 0; i < secciones.length; i++)
		for(var j = 0; j < secciones[i].items.length; j++)
		{
			if(secciones[i].items[j].obligatoriedad)
				count += secciones[i].items[j].ponderacion;
		}
	return count;
}

function puntajeMaximo(secciones){
	var count = 0;
	for(var i = 0; i < secciones.length; i++)
		for(var j = 0; j < secciones[i].items.length; j++)
		{
			if(secciones[i].items[j].seleccionado)
				count += secciones[i].items[j].ponderacion;
		}
	return count;
}

function verificarObligatorias(secciones) {
	var check = true;
	for(var i = 0; i < secciones.length; i++)
		for(var j = 0; j < secciones[i].items.length; j++)
		{
			if(secciones[i].items[j].obligatoriedad && !secciones[i].items[j].estado)
			{
				check = false;
				break;
			}
		}
	return check;
}

function listaAprobada(idProy, tipos, cb)
{
	var check = true;
	var puntaje = 0;
	var puntajeMax = 0;
	async.each(
		tipos,
		function(t, callback)
		{
			Lista.findOne({idProyecto: idProy, tipo: t, estado: 3}, function(err, lista) {
				if(!err && lista)
				{
					puntaje += lista.puntaje;
					puntajeMax += lista.puntajeMaximo;
				}
				else
					check = false;
				callback();
			});
		},
		function(err)
		{
			if(check)
				cb(puntaje/puntajeMax);
			else
				cb(-1);
		}
	);
}

module.exports = router;