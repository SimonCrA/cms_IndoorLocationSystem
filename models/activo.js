var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* ***************************
        
*	idTag al inicio sera `none`, al relacionar un tag con un activo se colocara el ID de la collection tag
*	y al colocar el activo `inactivo` volver a colocar el idTag `none`

/* ***************************/
   
var activoSchema = new Schema({
	
		idTag: {type: String},
		nombre: {type: String },        
        tipo: {type: String},
		descripcion: {type: String},
		estado:{type:Boolean}
		

	}
);  

//Export model
module.exports = mongoose.model('Activo', activoSchema);