var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var tagInfoSchema = new Schema({
	
		mactag: {type: String,  max: 50},
		temperature: {type: Number},
		batteryLevel: {type: Number},
		name: {type: String },
		type: {type: String },
		status:{type: Boolean }

	}
);  

//Export model
module.exports = mongoose.model('tagInfo', tagInfoSchema);