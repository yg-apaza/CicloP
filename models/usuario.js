var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
//var uniqueValidation = require('mongoose-beautiful-unique-validation');
var Schema = mongoose.Schema;

// Notificaciones: tipo: 1: Sistema, 2: Proyecto, 3: Check, 4: Warning

var Usuario = new Schema ({
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
    username: {
    	type: String,
    	validate: {
    		validator: function(v) {
    			return /^[A-Za-z0-9_]{6,16}$/.test(v);
    		},
    		message: '{VALUE} no es un usuario válido'
    	},
    	unique: true
    },
    notificaciones: {type: Array}
});

Usuario.plugin(passportLocalMongoose);
UsuarioModelo = mongoose.model('Usuario', Usuario);


UsuarioModelo.schema.path('correo').validate(function (value, respond) {                                                                                           
	UsuarioModelo.findOne({ correo: value }, function (err, user) {                                                                                                
        if(user)
        	respond(false);                                                                                                                         
    });                                                                                                                                                  
}, 'Este correo ya se encuentra registrado.');


module.exports = UsuarioModelo;