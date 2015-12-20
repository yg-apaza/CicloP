var async = require('async');
var express = require('express');
var router = express.Router();
var Modelo = require('../models/modelo');
var Lista = require('../models/lista');
var Rol = require('../models/rol');
var Usuario = require('../models/usuario');

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
									lista.push({id: l._id, nombre: l.nombre, fecha: fechaString(new Date(l.fCulminacion)), estado: l.estado, puntaje: (l.puntaje / l.puntajeMaximo) * 100, pertenece: true});
								else
									lista.push({id: l._id, nombre: l.nombre, fecha: fechaString(new Date(l.fCulminacion)), estado: l.estado, puntaje: (l.puntaje / l.puntajeMaximo) * 100, pertenece: false});
								break;
							case '2':
								if(req.user._id.toString() == l.probador && l.estado != 0)
									lista.push({id: l._id, nombre: l.nombre, fecha: fechaString(new Date(l.fCulminacion)), estado: l.estado, puntaje: (l.puntaje / l.puntajeMaximo) * 100});
								break;
							case '3':
								lista.push({id: l._id, nombre: l.nombre, fecha: fechaString(new Date(l.fCulminacion)), estado: l.estado, puntaje: (l.puntaje / l.puntajeMaximo) * 100});
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

router.post('/listasDisponibles', function(req, res) {
	var total = [false, false];
	switch(req.session.etapa)
	{
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
			async.each(
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

router.post('/agregar', function(req, res) {
	if(req.body.numLista && req.body.idProbador && req.body.fCulminacion) {
		Modelo.findOne({tipo: req.body.numLista}, function(err, modelo) {			
			var lista = new Lista({
				idProyecto: 	req.session.idProy,
				idModelo: 		modelo._id,
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
				Lista.findOne({idProyecto: req.session.idProy, tipo: modelo.tipo, estado: 4}, {sort: { 'fCreacion' : -1 }}, function(err, lista2) {
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
		res.json({status: true, secciones: lista.secciones});
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
	Rol.findOne({idUsuario: user._id, idProyecto: idProy}, function(err, rol) {
		Lista.findOne({_id: req.session.idLista}, function(err, lista) {
			if(rol.tipo == '1')
			{
				lista.estado = 1;
			}
			else if(rol.tipo == '2')
			{
				var puntaje = puntajeActual(lista.secciones);
				if(verificarObligarias(lista.secciones) && puntaje >= (lista.puntajeMinimo/lista.puntajeMaximo))
					lista.estado = 3;
				else
					lista.estado = 4;
			}
			lista.save();
		});
	});
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

function fechaString(fecha)
{
	var yyyy = fecha.getFullYear().toString();
	var mm = (fecha.getMonth()+1).toString();
	var dd  = fecha.getDate().toString();
	return	(dd[1]?dd:"0"+dd[0]) + '/' + 
	 		(mm[1]?mm:"0"+mm[0]) + '/' +
	 		 yyyy;
}

module.exports = router;