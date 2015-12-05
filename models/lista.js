var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Lista = new Schema({
	idProyecto: Schema.Types.ObjectId,
	idModelo: Schema.Types.ObjectId,
	tipo: Number,
	etapa: Number,
	nombre: String,
	fCreacion: {
		type: Date,
		default: Date.now()
	},
	fCulminacion: String,
	estado: Number, // 0: No publicado, 1: Publicado, 2: En proceso, 3: Aprobada, 4: Desaprobada
	encargado: Schema.Types.ObjectId,
	items: Array //[{seccion: int, item: int, estado: bool}]
});

module.exports = mongoose.model('Lista', Lista);