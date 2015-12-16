var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 1: Diseñador, 2: Probador, 3: Coordinador
var Rol = new Schema ({
	idUsuario: Schema.Types.ObjectId,
	idProyecto: Schema.Types.ObjectId,
	tipo: String
});

module.exports = mongoose.model('Rol', Rol);