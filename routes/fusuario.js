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

// 2u-r
router.post('/validate', function(req, res)	{
	if(req.body) {
		var i, nuevosUsuarios = req.body;
		var usuariosValidos = [];
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
						return res.json({status: false, message: "Ya existe ese nombre de usuario"});
					if(err.errors) {
						if(	err.errors.nombre ||
							err.errors.apellidos ||
							err.errors.correo ||
							err.errors.username )
							return res.json({status: false, message: "Datos inválidos"});
					}
				}
				else {
					enviarEmail(	req.body.correo,
									req.body.nombre + " " + req.body.apellidos);
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

function enviarEmail(para, nombre) {
	console.log("sadasdasd")
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
		    html: "<h1><strong>Bienvenido a Ciclo-P</strong></h1>" +
		    		"<p>Hola <strong>" + nombre + "</strong>!</p>" +
		    		"<p>Tu cuenta ha sido creada con &eacute;xito, ya puedes empezar a crear proyectos " +
		    		"o participar en otros. Con Ciclo - P podr&aacute;:</p>" +
		    		"<ul> <li>Verificar el estado de su proyecto</li> " +
		    		"<li>Planificar y ver las etapas de desarrollo de software</li>" +
		    		"<li>Crear y publicar listas de chequeo</li>" +
		    		"<li>Generar reportes y evaluar su proyecto</li></ul>" +
		    		"<p>Cualquier consulta o recomendaci&oacute;n, comun&iacute;quese a este mismo correo.</p>" +
		    		"<ul> </ul>" +
		    		"<hr /> " +
		    		"<p>Ciclo-P es una metodolog&iacute;a para el desarrollo de software." +
		    		"MOT S.A. propone una herramienta para su validaci&oacute;n y verificaci&oacute;n de" +
		    		"cada etapa propuesta.</p>" +
		    		"<p>Para mayor informaci&oacute;n acerca de esta metodolog&iacute;a consulte el siguiente art&iacute;culo:</p>" +
		    		"<blockquote>Propuesta&nbsp;&nbsp; Metodol&oacute;gica&nbsp;&nbsp; para&nbsp;&nbsp;" +
		    		"la&nbsp;&nbsp; realizaci&oacute;n&nbsp;&nbsp; de&nbsp;&nbsp;" +
		    		"Pruebas&nbsp;&nbsp; de&nbsp;&nbsp; software&nbsp;&nbsp; en&nbsp;&nbsp; un&nbsp;&nbsp;" +
		    		"Ambiente &nbsp;<br />" +
		    		"Productivo, Christian de Jes&uacute;s Cardona Vel&aacute;squez, 2009. Disponible en:" +
		    		"&lt;<a href='http://www.bdigital.unal.edu.co/930/1/8357252_2009.pdf'>" +
		    		"http://www.bdigital.unal.edu.co/930/1/8357252_2009.pdf</a>" +
		    		"&gt;</blockquote> <hr />  <p><small>MOT S.A. - Copyright 2015</small></p>"
	};
	
	transporter.sendMail(mailOptions, function(err, info) {
	    if(err)
	        console.log(error);
	    else
	    	console.log('Message sent: ' + info.response);
	});
}

module.exports = router;