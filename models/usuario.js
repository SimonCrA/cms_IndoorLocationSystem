var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var usuarioSchema = new Schema(
	{
		userName: {type: String,  max: 100},
		passw: {type: String , max: 100},        
        tx: {type: Number},
		estado: {type: Boolean}
	}
);  

//Export model
module.exports = mongoose.model('Usuario', usuarioSchema);