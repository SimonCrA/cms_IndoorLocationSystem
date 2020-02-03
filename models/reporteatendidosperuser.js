var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reporteTopTenSchema = new Schema({
    
    userid:{type: Schema.Types.ObjectId, ref:'user'},
    count: {type: Number},
    date: {type: Array},

});

//Export model
module.exports = mongoose.model('Reportetopten', reporteTopTenSchema);