var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ubicacionSchema = new Schema({
	
		nombre: {type: String},
		macRpi: {type: String},
		axis: {type: String },        
        xpos: {type: Number},
		ypos: {type: Number},
		idZona:{type: String},
		region:{type: String}
		

	}
);  

//Export model
module.exports = mongoose.model('InfoUbicacion', ubicacionSchema);