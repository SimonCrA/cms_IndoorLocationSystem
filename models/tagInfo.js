var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var tagInfoSchema = new Schema({
	
		mactag: {type: String,  max: 50},
		temperature: {type: Number},
		batteryLevel: {type: Number},
		nombre: {type: String },
		tipo: {type: String },
		estado:{type: Boolean }

	}
);  

//Export model
module.exports = mongoose.model('tagInfo', tagInfoSchema);