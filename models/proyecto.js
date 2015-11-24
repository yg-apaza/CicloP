var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Proyecto = new Schema({
	nombre: String,
	descripcion: String,
	fCreacion: String,
	fCulminacion: String
});

module.exports = mongoose.model('Proyecto', Proyecto);