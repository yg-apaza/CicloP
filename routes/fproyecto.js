var express = require('express');
var passport = require('passport');
var async = require('async');
var Proyecto = require('../models/proyecto');
var Usuario = require('../models/usuario');
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
	if(req.body._id && req.body.nombre && req.body.descripcion && req.body.fechaCulminacion && req.body.usuarios)
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
								var nuevosRoles = usuario.roles;
								nuevosRoles.push({rol: req.body.usuarios[i].rol, proyecto: proy._id});
								Usuario.update({username: usuario.username}, {roles: nuevosRoles}, function(err) {});
							}
						});
					})(i);
				}
				
				Usuario.findOne({username: req.user.username}, function (err, usuario) {
					if(!err && usuario)
					{
						var rolCoordinador = usuario.roles;
						rolCoordinador.push({rol: 3, proyecto: proy._id});
						Usuario.update({username: usuario.username}, {roles: rolCoordinador}, function(err) {});
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
	var roles = req.user.roles;
	
	var nombresProyectos = [];
	async.each(roles, function(r, callback) {
		Proyecto.findOne({_id: r.proyecto}, function (err, p) {
			if(!err)
			{
				nombresProyectos.push({nombre: p.nombre, id: p._id});
			}
			callback();
		});
	},
	function(err)
	{
		res.json(nombresProyectos);
	});
});

router.post('/verUltimoProyecto', function(req, res) {
	
	Proyecto.findOne({_id: req.session.idProy}, function(err, p){
		if(!err)
			return res.json({status: true, proyecto: p});
		else
			return res.json({status: false, proyecto: null});
	});
});

// MODIFICAR - GUARDAR NUEVOS DATOS (USUARIOS, NOMBRE, ... )
// VALIDAR ROLES DE USUARIOS ... (REPETIDOS)

router.post('/guardarId', function(req, res){
	req.session.idProy = req.body.id;
	res.json({status: true});
});

module.exports = router;