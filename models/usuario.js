var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// Notificaciones: tipo: 1: Sistema, 2: Proyecto, 3: Check, 4: Warning

var Usuario = new Schema({
    nombre: {
    	type: String,
    	validate: {
    		validator: function(v) {
    			return /^[A-Za-záéíóúñ]+([\s][A-Za-záéíóúñ]+)*$/.test(v);
    		},
    		message: '{VALUE} no es un nombre válido'
    	}
    },
    apellidos: {
    	type: String,
    	validate: {
    		validator: function(v) {
    			return /^[A-Za-záéíóúñ]+([\s][A-Za-záéíóúñ]+)*$/.test(v);
    		},
    		message: '{VALUE} no es un apellido válido'
    	}
    },
    correo: {
    	type: String,
    	validate: {
    		validator: function(v) {
    			return /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
    		},
    		message: '{VALUE} no es un correo válido'
    	}
    },
    usuario: {
    	type: String,
    	validate: {
    		validator: function(v) {
    			return /^[A-Za-z0-9_]{6,16}$/.test(v);
    		},
    		message: '{VALUE} no es un usuario válido'
    	}
    },
    clave: String,
    notificaciones: {type: Array},
    roles: {type: Array}

});

Usuario.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuario', Usuario);