var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var tagSchema = new Schema({
	
		macTag: {type: String,  max: 100},
		name: {type: String }
		

	}
);  

//Export model
module.exports = mongoose.model('Tag', tagSchema);