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
			Lista.find({etapa: req.body.etapa, idProyecto: req.session.idProy}, function(err, ls) {
				var lista = [];
				
				async.each(
					ls,
					function(l, callback){
						lista.push(l.nombre);
						callback();
					},
					function(err)
					{
						if(!err)
							res.json({status: true, rol: r.tipo, lista: lista});
						else
							res.json({status: false, rol: null, lista: null});
					}
				);
			});
		}
		else
			res.json({status: false, rol: null, lista: null});
	});
});

router.post('/listasDisponibles', function(req, res) {
	Lista.findOne({});
});

module.exports = router;