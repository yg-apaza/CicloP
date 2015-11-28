var express = require('express');
var passport = require('passport');
var Usuario = require('../models/usuario');
var router = express.Router();
var path = require('path');
var async = require('async');

router.post('/', function(req, res) {
	res.json({nombre: req.user.nombre, apellidos: req.user.apellidos, correo: req.user.correo, username: req.user.username});
});

// 2u-r
router.post('/validate', function(req, res) {
	if(req.body)
	{
		var i, nuevosUsuarios = req.body;
		async.each(nuevosUsuarios, function(nu, callback) {
			Usuario.findOne({username: nu.username}, function (err, usuario) {
				if(!err && usuario)
				{
					if(usuario.username == req.user.username)
					{
						nu.msjEstado = "no válido";
						nu.estado = 3;
					}
					else
					{
						nu.msjEstado = "existe";
						nu.estado = 1;
					}
				}
				else
				{
					nu.msjEstado = "no existe";
					nu.estado = 2;
				}
				callback();
			});
		},
		function(err)
		{
			res.json({status: true, usuarios: nuevosUsuarios});
		});
	}
	else
		res.json({status: false, usuarios: null});
});

/** Registro */
router.post('/register', function(req, res) {
	Usuario.register(new Usuario	({	nombre: req.body.nombre,
										apellidos: req.body.apellidos,
										username: req.body.usuario,
										correo: req.body.correo,
										notificaciones:[
							                {
							                	tipo: 1,
							                	titulo: "Bienvenido a Ciclo P",
							                	descripcion: "Bienvenido al sistema del Ciclo P. Comience creando un proyecto",
						                		fecha: new Date().toJSON().slice(5,10),
						                		leido: false
							                }
						                ]
									}),
									req.body.clave, function(err, usuario) {
		if (!(req.body.correo && req.body.nombre &&
				req.body.apellidos))
		{
			res.json({status: false, message: ""});
		}
		else
		{
			if(err)
			{
				// Completar otros errores de usuario
				if((err.name) == "UserExistsError")
					return res.json({status: false, message: "Ya existe ese nombre de usuario"});
				if(err.errors)
				{
					if(	err.errors.nombre ||
						err.errors.apellidos ||
						err.errors.correo ||
						err.errors.username )
						return res.json({status: false, message: ""});
				}
		
			}
			else
		    	return res.json({status: true, message: "Usuario registrado"});
		}
	});
});

/** Login */
router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return res.json({status: false, message: err.name});
		}
	    if (!user) {
	    	return res.json({status: false, message: "Ingreso de datos incorrectos"});
	    }
	    req.logIn(user, function(err) {
	    	if (err) {
	    		return res.json({status: false, message: "Contraseña inválida"});
	    	}
	    	return res.json({status: true, message: "Acceso valido"});;
	    });
	})(req, res, next);
});

/** Logout */
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;