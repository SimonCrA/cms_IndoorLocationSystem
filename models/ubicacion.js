var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ubicacionRpiSchema = new Schema({

		macRpi: {type: String},
		axis: {type: String }, 

        xpos: {type: Number},
		ypos: {type: Number},
		idZona:{type: String},
		estatus: {type:Boolean, default: true}
		

	}
);  

//Export model
module.exports = mongoose.model('infoUbicacionRpi', ubicacionRpiSchema);


