var mongoose = require('mongoose');
var Schema = mongoose.Schema;


let typeubication = {
    values: ['BL', 'BR', 'TR', 'TL'],
    message: '{VALUE}, is no a valid position'
};

var ubicacionRpiSchema = new Schema({

		macRpi: {type: String},
		axis: {type: String }, 
		ubicacion:{type: String, enum: typeubication},
        xpos: {type: Number},
		ypos: {type: Number},
		idZona:{type: Schema.Types.ObjectId, ref: 'zona'},
		estatus: {type:Boolean, default: true},
		compartido:{type: Schema.Types.ObjectId, ref: 'zona'},
		

	}
);  

//Export model
module.exports = mongoose.model('infoUbicacionRpi', ubicacionRpiSchema);


