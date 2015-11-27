var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Proyecto = new Schema({
	nombre: String,
	descripcion: String,
	fCreacion: {type: Date, default: Date.now},
	fCulminacion: String
});

module.exports = mongoose.model('Proyecto', Proyecto);