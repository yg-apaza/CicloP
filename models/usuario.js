var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// Notificaciones: tipo: 1: Sistema, 2: Proyecto, 3: Check, 4: Warning

var Usuario = new Schema({
    nombre: String,
    apellidos: String,
    correo: String,
    usuario: String,
    clave: String,
    //notificaciones: [{tipo: Number, mensaje: String, fecha: Date}]
    notificaciones: {type: Array}

});

Usuario.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuario', Usuario);