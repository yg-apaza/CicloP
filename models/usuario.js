var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

// Notificaciones: tipo: 1: Sistema, 2: Proyecto, 3: Check, 4: Warning

var Usuario = new Schema ({
    nombre: {
    	type: String,
    	validate: {
    		validator: function(v) {
    			return (/^[A-Za-záéíóúñ]+([\s][A-Za-záéíóúñ]+)*$/.test(v)) &&
    					(v.length <= 30);
    		},
    		message: '{VALUE} no es un nombre válido'
    	}
    },
    apellidos: {
    	type: String,
    	validate: {
    		validator: function(v) {
    			return (/^[A-Za-záéíóúñ]+([\s][A-Za-záéíóúñ]+)*$/.test(v)) &&
    					(v.length <= 30);
    		},
    		message: '{VALUE} no es un apellido válido'
    	}
    },
    correo: {
    	type: String,
    	validate: {
    		validator: function(v) {
    			return (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v)) &&
    					(v.length <= 50);
    		},
    		message: '{VALUE} no es un correo válido'
    	}
    
    },
    username: {
    	type: String,
    	validate: {
    		validator: function(v) {
    			return /^[A-Za-z0-9_]{6,}$/.test(v);
    		},
    		message: '{VALUE} no es un usuario válido'
    	}
    },
    notificaciones: {type: Array}
});

Usuario.plugin(passportLocalMongoose, {
	passwordValidator: function(password, cb) {
		if (!(password.length >= 6 && password.length <= 20))
			return cb({	code: 400,
						message: "Error de validación de contraseña",
						errors: {
							password: {
								message: "La contraseña debe tener entre 6 y 20 caracteres"
							}
						}
					  });
	    return cb(null);
	}
});

module.exports = mongoose.model('Usuario', Usuario);