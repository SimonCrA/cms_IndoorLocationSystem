var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var zonaSchema = new Schema({

    edificio: {type: String},
    piso: {type: String },        
    oficina: {type: String},
    tipodeZona: {type: String},

	}
);  

//Export model
module.exports = mongoose.model('zona', zonaSchema);
