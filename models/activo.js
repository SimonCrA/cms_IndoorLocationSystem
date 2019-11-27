var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* ***************************
        
*	idTag al inicio sera `none`, al relacionar un tag con un activo se colocara el ID de la collection tag
*	y al colocar el activo `inactivo` volver a colocar el idTag `none`

/* ***************************/
   
var activoSchema = new Schema({
	
		nombre: { type: String },
		VIN: {type:Number},
		anio: {type: Number},
		modelo: {type:String},
		color: {type: String},
        tipo: {type: String },
		descripcion: { type: String },
		estado: { type:Boolean },
		idTag: { type: Schema.Types.ObjectId, ref: 'tagInfo' }


	}
);  

//Export model
module.exports = mongoose.model('Activo', activoSchema);