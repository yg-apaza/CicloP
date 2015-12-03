var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Lista = new Schema({
	idProyecto: Schema.Types.ObjectId,
	idModelo: Schema.Types.ObjectId,
	tipo: Number,
	nombre: String,
	etapa: Number,
	estado: Number,
	items: Array //[{seccion: int, item: int, estado: bool}]
});

module.exports = mongoose.model('Lista', Lista);