var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Rol = new Schema ({
	idUsuario: Schema.Types.ObjectId,
	idProyecto: Schema.Types.ObjectId,
	tipo: String
});

module.exports = mongoose.model('Rol', Rol);