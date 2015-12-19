var async = require('async');
var crypto = require('crypto');
var express = require('express');
var nodemailer = require('nodemailer');
var passport = require('passport');
var path = require('path');
var Usuario = require('../models/usuario');
var Token = require('../models/token');
var router = express.Router();

router.post('/', function(req, res) {
	var hashImagen = crypto.createHash('md5').update(req.user.correo).digest('hex');
	res.json({
				nombre: req.user.nombre,
				apellidos: req.user.apellidos,
				correo: req.user.correo,
				username: req.user.username,
				hashImagen: hashImagen
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

/** Registro */
router.post('/register', function(req, res) {
	Usuario.findOne({correo: req.body.correo}, function (err, u) {
		if(!u)
		{
			Usuario.register(
				new Usuario({
								nombre: req.body.nombre,
								apellidos: req.body.apellidos,
								username: req.body.usuario,
								correo: req.body.correo,
								notificaciones:[
					                {
					                	tipo: 1,
					                	titulo: "Bienvenido a Ciclo-P",
					                	descripcion: "Bienvenido al sistema del Ciclo-P. Comience creando un proyecto.",
				                		fecha: new Date().toJSON().slice(5,10),
				                		leido: false
					                }
				                ]
							}),
				req.body.clave,
			    function(err, usuario) {
					if (!(req.body.nombre && req.body.apellidos && req.body.correo))
						return res.json({status: false, message: ""});
					else
					{
						if(err) {
							if((err.name) == "UserExistsError")
								return res.json({status: false, messageUsuario: true});
							if(err.errors) {
								if(	err.errors.nombre 		||
									err.errors.apellidos 	||
									err.errors.username 	||
									err.errors.correo		||
									err.errors.password)
									return res.json({status: false, message: "Datos invalidos"});
							}
						}
						else {
							enviarEmail(	req.body.correo,
											req.body.nombre + " " + req.body.apellidos,
											req.body.usuario);
					    	return res.json({status: true, message: "Usuario registrado correctamente"});
						}
					}
				}
			);
		}
		else
			return res.json({status: false, messageCorreo: true});
	});
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

/** Restablecer contraseña */

router.post('/recuperar', function(req, res) {
	Usuario.findOne({correo: req.body.correo}, function(err, user) {
		if(!err && user) {
			crypto.randomBytes(4, function(ex, buf) {
				var tokenGen = buf.toString('hex');
				var token = new Token({	idUsuario: user._id,
										token: tokenGen
									 });
				token.save();
				enviarEmailRecuperacion(req.body.correo,
						user.nombre + " " + user.apellidos,
						tokenGen);
				return res.json({status: true});
			});
		}
		else 
			return res.json({status: false});
	});
});

router.post('/cambiarContrasena', function(req, res) {
	Token.findOne({token: req.body.token}, function(err, t) {
		if(!err && t)
		{
			Usuario.findOne({_id: t.idUsuario}, function(err, u) {
				if(!err)
				{
					u.setPassword(req.body.password, function(err){
						if (!err) {
		                    u.save(function(err) {
		                        if (err)
		                        	res.json({status: false});
		                        else
		                        	res.json({status: true});
		                    });
		                }
		                else
		                	res.json({status: false});
					});
				}
				else
					res.json({status: false});					
			});
		}
		else{
			res.json({status: false});
		}
			
	});
});

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

function enviarEmailRecuperacion(para, nombre, token) {
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
		    subject: "Restablecer contraseña",
		    text: "",
		    html:
		    	'<h1 style="text-align: center;"><img alt="" src="https://raw.githubusercontent.com/yg-apaza/CicloP/master/public/img/logo.png" style="height: 100px; width: 277px;" /></h1>' +
		    	'<h1><span style="font-family:verdana,geneva,sans-serif;"><strong>Cambio de contraseña</strong></span></h1>' +
		    	'<p><span style="font-family:verdana,geneva,sans-serif;">Hola <strong>' + nombre + '</strong>!</span></p>' +
		    	'<p><span style="font-family:verdana,geneva,sans-serif;">Has solicitado restablecer tu contraseña, tu c&oacute;digo generado es:</span></p>' +
		    	'<h2 style="text-align: center;">' + token + '</h2>' +
		    	'<p><span style="font-family:verdana,geneva,sans-serif;">Este código expirará en una hora, sino lo solicitaste esto, ignora este mensaje.</span></p>' +
		    	'<hr />' +
		    	'<p><span style="font-family:verdana,geneva,sans-serif;">Ciclo-P es una metodolog&iacute;a para el desarrollo de software. MOT S.A. propone una herramienta para su validaci&oacute;n y verificaci&oacute;n de cada etapa propuesta.</span></p>' +
		    	'<p><span style="font-family:verdana,geneva,sans-serif;">Para mayor informaci&oacute;n acerca de esta metodolog&iacute;a consulte el siguiente art&iacute;culo:</span></p>' +
		    	'<div style="background:#eee;border:1px solid #ccc;padding:5px 10px;"><span style="font-family:verdana,geneva,sans-serif;"><em>Propuesta&nbsp;&nbsp; Metodol&oacute;gica&nbsp;&nbsp; para&nbsp;&nbsp; la&nbsp;&nbsp; realizaci&oacute;n&nbsp;&nbsp; de&nbsp;&nbsp; Pruebas&nbsp;&nbsp; de&nbsp;&nbsp; software&nbsp;&nbsp; en&nbsp;&nbsp; un&nbsp;&nbsp; Ambiente&nbsp; Productivo, Christian de Jes&uacute;s Cardona Vel&aacute;squez, 2009. Disponible en: &lt;<a href="http://www.bdigital.unal.edu.co/930/1/8357252_2009.pdf">http://www.bdigital.unal.edu.co/930/1/8357252_2009.pdf</a> &gt;</em></span></div>' +
		    	'<hr />' +
		    	'<p style="text-align: center;"><span style="font-family:verdana,geneva,sans-serif;"><small><span class="marker">MOT S.A. - Copyright 2015</span></small></span></p>'
	};
	transporter.sendMail(mailOptions, function(err, info) {});
};

module.exports = router;