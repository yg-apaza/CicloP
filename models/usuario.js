var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Usuario = new Schema({
    nombre: String,
    apellidos: String,
    correo: String,
    usuario: String,
    clave: String
});

Usuario.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuario', Usuario);