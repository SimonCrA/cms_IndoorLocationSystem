var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topTenModeloSchema = new Schema({
    activo: {type: Schema.Types.ObjectId, ref: 'activo'},
    cantBusquedas: {type: Number}
});

//Export model
module.exports = mongoose.model('Modelotopten', topTenModeloSchema);