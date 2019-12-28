var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topTenColorSchema = new Schema({
    activo: {type: Array},
    cantBusquedas: {type: Number}
});

//Export model
module.exports = mongoose.model('Colortopten', topTenColorSchema);