var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reporteTopTenSchema = new Schema({
    
    name: {type: String},
    count: {type: Number},
    type: {type: String},
    date: {type: Array},

});

//Export model
module.exports = mongoose.model('Reportetopten', reporteTopTenSchema);