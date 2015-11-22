var express = require('express');
var passport = require('passport');
var Usuario = require('../models/usuario');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
	res.json(req.user);
});

router.post('/validate', function(req, res) {
	
});

/** Registro */
router.post('/register', function(req, res) {
	Usuario.register(new Usuario({nombre: req.body.nombre, apellidos: req.body.apellidos, username: req.body.usuario, correo: req.body.correo}), req.body.clave, function(err, usuario) {
		if(err)
		{
			// Completar otros errores de usuario
			if((err.name) == "UserExistsError")
				return res.json({status: false, message: "Ya existe ese nombre de usuario."});
		}
		else
			return res.json({status: true, message: "Usuario registrado con éxito"});
	});
});

/** Login */
router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		console.log(user);
		if (err) {
			return res.json({message: err.name});
		}
	    if (!user) {
	    	return res.json({message: "No existe el usuario."});
	    }
	    req.logIn(user, function(err) {
	    	console.log(err);
	    	if (err) {
	    		return res.json({message: "Contraseña inválida"});
	    	}
	    	return res.json({message: "Acceso correcto"});
	    });
	})(req, res, next);
});

/** Logout */
router.post('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});


module.exports = router;