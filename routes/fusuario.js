var async = require('async');
var express = require('express');
var nodemailer = require('nodemailer');
var passport = require('passport');
var path = require('path');
var Usuario = require('../models/usuario');
var router = express.Router();

router.post('/', function(req, res) {
	res.json({
				nombre: req.user.nombre,
				apellidos: req.user.apellidos,
				correo: req.user.correo,
				username: req.user.username
			});
});

router.post('/validate', function(req, res)	{
	if(req.body) {
		var i, nuevosUsuarios = req.body.nuevos;
		var usuariosValidos = [];
		
		if(req.body.anteriores)
		{
			var i;
			for(i = 0; i < req.body.anteriores.length; i++)
				usuariosValidos.push(req.body.anteriores[i].username);
		}
		
		async.each(
			nuevosUsuarios,
			function(nu, callback) {
				Usuario.findOne(
					{username: nu.username},
					function (err, usuario) {
						if(!err && usuario) {
							if(usuario.username == req.user.username) {
								nu.msjEstado = "no válido";
								nu.estado = 3;
							}
							else {
								if(usuariosValidos.indexOf(nu.username) > -1) {
									nu.msjEstado = "no válido";
									nu.estado = 3;
								}
								else {
									nu.msjEstado = "existe";
									nu.estado = 1;
									usuariosValidos.push(nu.username);
								}
							}
						}
						else {
							nu.msjEstado = "no existe";
							nu.estado = 2;
						}
						callback();
					}
				);
			},
			function(err) {
				res.json({status: true, usuarios: nuevosUsuarios});
			}
		);
	}
	else
		res.json({status: false, usuarios: null});
});

router.post('/recuperar', function(req,res){
	console.log(req.body);
	Usuario.findOne({correo:req.body.correo},function(err, user){
		if(!err && user) {
			enviarEmailRecuperacion(	req.body.correo,
					user.nombre + " " + user.apellidos,
					user.username);
			return res.json({status: true , nombre: user.nombre});
		}
		else 
			return res.json({status: false, nombre: null});
	});
});

/** Registro */
router.post('/register', function(req, res) {
	Usuario.register(
		new Usuario({
						nombre: req.body.nombre,
						apellidos: req.body.apellidos,
						username: req.body.usuario,
						correo: req.body.correo,
						notificaciones:[
			                {
			                	tipo: 1,
			                	titulo: "Bienvenido a Ciclo P",
			                	descripcion: "Bienvenido al sistema del Ciclo P. Comience creando un proyecto.",
		                		fecha: new Date().toJSON().slice(5,10),
		                		leido: false
			                }
		                ]
					}),
		req.body.clave,
	    function(err, usuario) {
			if (!(req.body.nombre && req.body.apellidos && req.body.correo))
				res.json({status: false, message: "Campos vacíos"});
			else
			{
				if(err) {
					// Completar otros errores de usuario
					if((err.name) == "UserExistsError")
						return res.json({status: false, messageUsuario: true});
					if(err.errors.correo)
						return res.json({status: false, messageCorreo: true});
					if(err.errors) {
						if(	err.errors.nombre ||
							err.errors.apellidos ||
							err.errors.username )
							return res.json({status: false, message: "Datos inválidos"});
					}
				}
				else {
					enviarEmail(	req.body.correo,
									req.body.nombre + " " + req.body.apellidos,
									req.body.usuario);
			    	return res.json({status: true, message: "Usuario registrado"});
				}
			}
		}
	);
});

/** Login */
router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err)
			return res.json({status: false, message: err.name});
	    if (!user)
	    	return res.json({status: false, message: "Ingreso de datos incorrectos"});
	    req.logIn(user, function(err) {
	    	if (err)
	    		return res.json({status: false, message: "Contraseña inválida"});
	    	return res.json({status: true, message: "Acceso valido"});;
	    });
	})(req, res, next);
});

/** Logout */
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

function enviarEmailRecuperacion(para, nombre, usuario) {
	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'motsa.software@gmail.com',
	        pass: 'motonmatoamotita'
	    }
	});
	
	var mailOptions = {
		    from: 'MOT S.A. <kefer15@gmail.com>',
		    to: para,
		    subject: "Mensaje de Recuperacion de Ciclo-P",
		    text: "",
		    html:
		    	'<p><span style="font-family:verdana,geneva,sans-serif;">Hola <strong>' + nombre + '</strong>!</span></p>' +
		    	'<p><span style="font-family:verdana,geneva,sans-serif;">Para iniciar sesi&oacute;n recuerde los siguientes datos:</span></p>' +
		    	'<ul>' +
		    		'<li><span style="font-family:verdana,geneva,sans-serif;">Nombre de Usuario: <strong>' + usuario + '</strong></span></li>' +
		    	'</ul>' + 
		    	'<p><span style="font-family:verdana,geneva,sans-serif;">Cualquier consulta o recomendaci&oacute;n, comun&iacute;quese a este mismo correo.</span></p>' +
		    	'<hr />' +
		    	'<p style="text-align: center;"><span style="font-family:verdana,geneva,sans-serif;"><small><span class="marker">MOT S.A. - Copyright 2015</span></small></span></p>'
	};
	
	transporter.sendMail(mailOptions, function(err, info) {});
};


function enviarEmail(para, nombre, usuario) {
	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'motsa.software@gmail.com',
	        pass: 'motonmatoamotita'
	    }
	});
	
	var mailOptions = {
		    from: 'MOT S.A. <kefer15@gmail.com>',
		    to: para,
		    subject: "Bienvenido a Ciclo-P",
		    text: "",
		    html:
		    	'<h1 style="text-align: center;"><img alt="" src="https://raw.githubusercontent.com/yg-apaza/CicloP/master/public/img/logo.png" style="height: 100px; width: 277px;" /></h1>' +
		    	'<h1><span style="font-family:verdana,geneva,sans-serif;"><strong>Bienvenido a Ciclo-P</strong></span></h1>' +
		    	'<p><span style="font-family:verdana,geneva,sans-serif;">Hola <strong>' + nombre + '</strong>!</span></p>' +
		    	'<p><span style="font-family:verdana,geneva,sans-serif;">Tu cuenta <strong><em>' + usuario + '</em></strong> ha sido creada con &eacute;xito, ya puedes empezar a crear proyectos o participar en otros, adem&aacute;s de:</span></p>' +
		    	'<ul>' +
		    		'<li><span style="font-family:verdana,geneva,sans-serif;">Verificar el estado de su proyecto</span></li>' +
		    		'<li><span style="font-family:verdana,geneva,sans-serif;">Planificar y ver las etapas de desarrollo de software</span></li>' +
		    		'<li><span style="font-family:verdana,geneva,sans-serif;">Crear y publicar listas de chequeo</span></li>' +
		    		'<li><span style="font-family:verdana,geneva,sans-serif;">Generar reportes y evaluar su proyecto</span></li>' +
		    	'</ul>' + 
		    	'<p><span style="font-family:verdana,geneva,sans-serif;">Cualquier consulta o recomendaci&oacute;n, comun&iacute;quese a este mismo correo.</span></p>' +
		    	'<hr />' +
		    	'<p><span style="font-family:verdana,geneva,sans-serif;">Ciclo-P es una metodolog&iacute;a para el desarrollo de software. MOT S.A. propone una herramienta para su validaci&oacute;n y verificaci&oacute;n de cada etapa propuesta.</span></p>' +
		    	'<p><span style="font-family:verdana,geneva,sans-serif;">Para mayor informaci&oacute;n acerca de esta metodolog&iacute;a consulte el siguiente art&iacute;culo:</span></p>' +
		    	'<div style="background:#eee;border:1px solid #ccc;padding:5px 10px;"><span style="font-family:verdana,geneva,sans-serif;"><em>Propuesta&nbsp;&nbsp; Metodol&oacute;gica&nbsp;&nbsp; para&nbsp;&nbsp; la&nbsp;&nbsp; realizaci&oacute;n&nbsp;&nbsp; de&nbsp;&nbsp; Pruebas&nbsp;&nbsp; de&nbsp;&nbsp; software&nbsp;&nbsp; en&nbsp;&nbsp; un&nbsp;&nbsp; Ambiente&nbsp; Productivo, Christian de Jes&uacute;s Cardona Vel&aacute;squez, 2009. Disponible en: &lt;<a href="http://www.bdigital.unal.edu.co/930/1/8357252_2009.pdf">http://www.bdigital.unal.edu.co/930/1/8357252_2009.pdf</a> &gt;</em></span></div>' +
		    	'<hr />' +
		    	'<p style="text-align: center;"><span style="font-family:verdana,geneva,sans-serif;"><small><span class="marker">MOT S.A. - Copyright 2015</span></small></span></p>'
	};
	
	transporter.sendMail(mailOptions, function(err, info) {});
};

////
module.exports = router;