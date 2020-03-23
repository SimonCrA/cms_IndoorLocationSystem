var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportAatendidosperuserSchema = new Schema({
    
    userid:{type: Schema.Types.ObjectId, ref:'User'},
    count: {type: Number},
    date: {type: Array},

});

//Export model
module.exports = mongoose.model('reportAatendidosperuser', reportAatendidosperuserSchema);