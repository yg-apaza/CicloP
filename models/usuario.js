var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Usuario = new Schema({
    nomUsuario: String,
    contrasena: String,
    correoElectronico: String
});

Usuario.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuario', Usuario);