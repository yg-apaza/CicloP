var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Lista = new Schema({
	idProyecto: Schema.Types.ObjectId,
	idModelo: Schema.Types.ObjectId,
	items: Array //[{seccion: int, item: int}]
});

module.exports = mongoose.model('Lista', Lista);