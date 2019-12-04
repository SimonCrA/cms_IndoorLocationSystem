var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ubicacionRpiSchema = new Schema({

		macRpi: {type: String},
		axis: {type: String }, 

        xpos: {type: Number},
		ypos: {type: Number},
		idZona:{type: Schema.Types.ObjectId, ref: 'zona'},
		estatus: {type:Boolean, default: true},
		compartido:{type:String}
		

	}
);  

//Export model
module.exports = mongoose.model('infoUbicacionRpi', ubicacionRpiSchema);


