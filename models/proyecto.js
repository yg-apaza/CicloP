var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Proyecto = new Schema({
	nombre: {
    	type: String,
    	validate: {
    		validator: function(v) {
    			if(v.length > 0)
    				return true;
    			else
    				return false;
    		},
    		message: '{VALUE} no es un nombre de proyecto valido'
    	}
    },
	descripcion: String,
	fCreacion: {type: Date, default: Date.now},
	fCulminacion: {
    	type: String,
    	validate: {
    		validator: function(v) {
    			if(v.length > 0)
    				return true;
    			else
    				return false;
    		},
    		message: '{VALUE} no es una fecha de culminación de proyecto valida'
    	}
    }
});

module.exports = mongoose.model('Proyecto', Proyecto);