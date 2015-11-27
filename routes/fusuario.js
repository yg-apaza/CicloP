var express = require('express');
var passport = require('passport');
var Usuario = require('../models/usuario');
var router = express.Router();
var path = require('path');

router.post('/', function(req, res) {
	res.json({nombre: req.user.nombre, apellidos: req.user.apellidos, correo: req.user.correo, username: req.user.username});
});

router.post('/validate', function(req, res) {
	var i;
	for(i = 0; i < req.body.usuarios.length; i++)
	{
		(function(i, req)
		{
			Usuario.findOne({username: req.body.usuarios[i].username}, function (err, usuario) {
				if(!err && usuario)
				{
					req.body.usuarios[i].msjEstado = "existe";
					req.body.usuarios[i].estado = true;
					/*
					console.log(nuevosRoles)
					var nuevosRoles = usuario.roles;
					nuevosRoles.push({rol: req.body.usuarios[i].rol, proyecto: proy._id});
					Usuario.update({username: usuario.username}, {roles: nuevosRoles}, function(err) {});
					*/
				}
				else
				{
					req.body.usuarios[i].msjEstado = "no existe";
					req.body.usuarios[i].estado = false;
				}
			});
		})(i, req);
	}
	res.json(req.body.usuarios);
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
						err.errors.usuario )
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