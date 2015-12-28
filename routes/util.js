var exports = module.exports = {};
var async = require('async');
var Usuario = require('../models/usuario');

exports.fechaString = function (fecha) {
	if(fecha)
	{
		var yyyy = fecha.getFullYear().toString();
		var mm = (fecha.getMonth()+1).toString();
		var dd  = fecha.getDate().toString();
		return	(dd[1]?dd:"0"+dd[0]) + '/' + 
		 		(mm[1]?mm:"0"+mm[0]) + '/' +
		 		 yyyy;
	}
	else
		return '-';
};

exports.enviarNotificacion = function(num, datos, idUsuario, varios, cb) {
	var titulo = "";
	var descripcion = "";
	var tipo = 0;
	switch(num)
	{
		// Cuando una persona crea una nueva cuenta
		case 1:
			tipo = 1;
			titulo = "Bienvenido a Ciclo-P";
			descripcion = "Bienvenido al sistema del Ciclo-P. Comience creando un proyecto.";
			break;
			
		// Cuando el usuario ha sido designado para desempeñar un rol dentro de un proyecto
		case 2:
			tipo = 2;
			titulo = "Bienvenido a un nuevo proyecto";
			descripcion = "Usted ha sido agregado al proyecto '" + datos[0] + "' y su rol es " + datos[1] + ".";
			break;
			
		// Cuando finaliza la evaluación de cada etapa de un determinada proyecto
		case 3:
			tipo = 3;
			titulo = "Evaluación de etapa finalizada";
			descripcion = "Ha finalizado la evaluación de la etapa '" + datos[0] + "' del proyecto '" + datos[1] + "', usted puede continuar con la evaluación de la siguiente etapa."
			break;
			
		// Cuando finaliza el periodo de evaluacion de una lista de chequeo
		case 4:
			tipo = 4;
			titulo = "Periodo de evaluación excedido";
			descripcion = "El limite de periodo de evaluación de la lista de chequeo '" + datos[0] + "' ha sido excedido. Se le recomienda revisar el estado de la lista de chequeo, pues ha sido publicada."
			break;
			
		// Cuando finaliza la evaluación de un determinado proyecto
		case 5:
			tipo = 3;
			titulo = "Proyecto terminado";
			descripcion = "Felicidades la evaluación de tu proyecto '" + datos[0] + "' ha terminado satisfactoriamente.";
			break;
			
		// Cuando un usuario cambia su contraseña
		case 6:
			tipo = 1;
			titulo = "Contraseña cambiada";
			descripcion = "Usted ha cambiado su contraseña.";
			break;
	}
	if(!varios)
	{
		Usuario.findOne({_id: idUsuario}, function(err, u) {
			u.notificaciones.push({
				tipo: tipo,
				titulo: titulo,
				descripcion: descripcion,
				fecha: new Date(),
				leido: false
			});
			Usuario.update({_id: idUsuario}, {notificaciones: u.notificaciones}, function(err){		
				cb(err);
			});
		});
	}
	else
	{
		async.eachSeries(
				idUsuario,
				function(id, callback) {
					Usuario.findOne({_id: id}, function (err, u) {
						u.notificaciones.push({
							tipo: tipo,
							titulo: titulo,
							descripcion: descripcion,
							fecha: new Date(),
							leido: false
						});
						Usuario.update({_id: id}, {notificaciones: u.notificaciones}, function(err){		
							callback();
						});
					});
				},
				function(err) {
					cb(err);
				}
			);
	}
};