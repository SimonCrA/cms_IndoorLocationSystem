var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var constantesDistanciaSchema = new Schema({

		macRpi: {type: String,  max: 100},
		macTag: {type: String,  max: 100},
		propagationN: {type: Number },        
        rssiProm: {type: Number},
		standardDeviation: {type: Number},
		idRegion: {type: String},
		test: {type: String},
		type:{type: String}
		

	}
);  

//Export model
module.exports = mongoose.model('ConstantesDistancia', constantesDistanciaSchema);