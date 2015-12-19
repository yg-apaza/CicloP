var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Token = new Schema ({
	idUsuario: Schema.Types.ObjectId,
	token: String,
	fCreacion: {
		type: Date,
		default: Date.now()
	},
});

module.exports = mongoose.model('Token', Token);