var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/* ***************************
        
*	idTag al inicio sera `none`, al relacionar un tag con un activo se colocara el ID de la collection tag
*	y al colocar el activo `inactivo` volver a colocar el idTag `none`

/* ***************************/
   
var activoSchema = new Schema({
	
		name: { type: String }, //MARCA
		VIN: { type: Number },
		year: { type: String },
		model: { type:String },
		color: { type: String },
		type: { type: String },
		startDate:  {type: Date, default: Date.now()},
		endDate:  {type: Date},
		description: { type: String },
		status: { type:Boolean },
		idTag: { type: Schema.Types.ObjectId, ref: 'tagInfo' },
		client: { type: Schema.Types.ObjectId, ref: 'client' }

	}
);  

//Export model
module.exports = mongoose.model('Activo', activoSchema);