var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportetiempoventaSchema = new Schema({
    
    
    startTime : {type: Date},
    endTime : {type: Number},
    asset : { type: Schema.Types.ObjectId, ref: 'Activo', required: false },
    type : { type: String}

    

});

//Export model
module.exports = mongoose.model('Reportetiempoventa', reportetiempoventaSchema);