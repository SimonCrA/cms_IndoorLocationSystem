var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topTenSalesSchema = new Schema({
    brand:{type:String},
    model: {type: String},
    color: {type: String},
    year: {type: Number},
    count: {type: Number},
    date:{type:Array}
});

//Export model
module.exports = mongoose.model('Toptensales', topTenSalesSchema);