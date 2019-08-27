var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var distanceTags = new Schema({

		macRpi: {type: String,  max: 100},
		macTag: {type: String,  max: 100},
		distanciaTag: {type: Number },        
        region: {type: String},
		date: {type: Number}
		

	}
);  

//Export model
module.exports = mongoose.model('Distancia', distanceTags);