var async = require('async');
var express = require('express');
var router = express.Router();
var Modelo = require('../models/modelo');
var Lista = require('../models/lista');
var Rol = require('../models/rol');
var Usuario = require('../models/usuario');

router.post('/rol', function(req, res) {
	Rol.findOne({idUsuario: req.user._id, idProyecto: req.session.idProy}, function(err, r){
		if(!err)
		{
			console.log(req.session.etapa);
			console.log(req.session.idProy);
			Lista.find({etapa: req.session.etapa, idProyecto: req.session.idProy}, function(err, ls) {
				var lista = [];
				async.each(
					ls,
					function(l, callback){
						console.log(l);
						lista.push({nombre: l.nombre, id: l._id});
						callback();
					},
					function(err)
					{
						if(!err)
							res.json({status: true, rol: r.tipo, listas: lista});
						else
							res.json({status: false, rol: null, listas: null});
					}
				);
			});
		}
		else
			res.json({status: false, rol: null, listas: null});
	});
});

//prueba
router.post('/listasDisponibles', function(req, res) {
	var total = [false, false];
	switch(req.session.etapa)
	{
		case 1: 
			Lista.findOne({tipo: 1}, function(err, l1) {
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
			Lista.findOne({$or:[{tipo: 2}, {tipo: 3}]}, function(err, l23) {
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
			Lista.findOne({$or:[{tipo: 4}, {tipo: 5}]}, function(err, l45) {
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
			Lista.findOne({$or:[{tipo: 6}, {tipo: 7}]}, function(err, l67) {
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
			Lista.findOne({tipo: 8}, function(err, l8) {
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
	Rol.find({idProyecto: req.session.idProy, tipo: 2}, function(err, roles) {
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
		console.log(req.body.numLista);
		Modelo.findOne({tipo: req.body.numLista}, function(err, modelo){
			var lista = new Lista({
				idProyecto: req.session.idProy,
				idModelo: modelo._id,
				tipo: modelo.tipo,
				etapa: modelo.etapa,
				nombre: modelo.nombre,
				fCulminacion: req.body.fCulminacion,
				estado: 0,
				encargado: req.body.idProbador,
				items: null
			});
			
			lista.save(function(err){
				if(!err)
					res.json({status: true});
				else
					res.json({status: false});
			});
		});
	}
});

router.post('/guardarEtapa', function(req, res) {
	console.log(req.body);
	req.session.etapa = req.body.etapa;
	res.json({status: true});
});

router.post('/guardarLista', function(req, res) {
	req.session.lista = req.body.idLista;
	res.json({status: true});
});

router.post('/verEtapa', function(req, res){
	res.json({status: true, etapa: req.session.etapa});
});

module.exports = router;