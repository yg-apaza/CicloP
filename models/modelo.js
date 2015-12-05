var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Modelo = new Schema({
	etapa: Schema.Types.ObjectId,
	nombre: String,
	tipo: Number,
	secciones: Array	
});

module.exports = mongoose.model('Modelo', Modelo);