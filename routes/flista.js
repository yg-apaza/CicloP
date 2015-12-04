var async = require('async');
var express = require('express');
var router = express.Router();
var Lista = require('../models/lista');
var Rol = require('../models/rol');

router.post('/rol', function(req, res) {
	Rol.findOne({idUsuario: req.user._id, idProyecto: req.session.idProy}, function(err, r){
		console.log(err);
		if(!err)
		{
			Lista.find({etapa: req.session.etapa, idProyecto: req.session.idProy}, function(err, ls) {
				var lista = [];
				async.each(
					ls,
					function(l, callback){
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
						res.json({status: true, listas: null});
				}
				else
					res.json({status: false, listas: null})
			});
		break;

		case 2:
			Lista.findOne({tipo: 1}, function(err, l) {
				if(!err)
				{
					if(!aux || aux.estado == 4)
						res.json({status: true, listas: [1]});
					else
						res.json({status: true, listas: null});
				}
				else
					res.json({status: false, listas: null})
			});
		break;
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