var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Lista = new Schema({
	idProyecto: 	Schema.Types.ObjectId,
	idModelo: 		Schema.Types.ObjectId,
	tipo: 			Number,
	etapa: 			Number,
	nombre: 		String,
	estado: 		Number, // 0: No publicado, 1: Publicado, 2: En proceso, 3: Aprobada, 4: Desaprobada
	disenador: 		Schema.Types.ObjectId,
	probador: 		Schema.Types.ObjectId,
	puntaje: 		Number,
	puntajeMinimo:	Number,
	puntajeMaximo:	Number,
	fCreacion: {
		type: 		Date,
		default: 	Date.now()
	},
	fCulminacion: 	String,
	secciones: 		Array
});

module.exports = mongoose.model('Lista', Lista);