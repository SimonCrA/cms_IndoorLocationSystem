var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reporteTopTenSchema = new Schema({
    
    nombre: {type: String},
    count: {type: Number},
    tipo: {type: String},
    date: {type: Array},

});

//Export model
module.exports = mongoose.model('Reportetopten', reporteTopTenSchema);