var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Usuario = new Schema({
    usuario: String,
    contrasenia: String,
    email: String
});

Usuario.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuario', Usuario);