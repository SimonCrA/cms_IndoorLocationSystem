var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var devicesSchema = new Schema({
	
		macdevices: {type: String,  max: 100},
		name: {type: String }
		

	}
);  

//Export model
module.exports = mongoose.model('Devices', devicesSchema);