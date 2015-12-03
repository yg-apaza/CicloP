var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Lista = new Schema({
	idProyecto: Schema.Types.ObjectId,
	idModelo: Schema.Types.ObjectId,
	nombre: String,
	tipo: Number,
	etapa: Number,
	fCreacion: {
		type: Date,
		default: Date.now()
	},
	fCulminacion: Date,
	estado: Number, // 1: Publicado, 2: En proceso, 3: Aprobada, 4: Desaprobada
	items: Array //[{seccion: int, item: int, estado: bool}]
});

module.exports = mongoose.model('Lista', Lista);