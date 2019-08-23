var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var constantesDistanciaSchema = new Schema({

		macRpi: {type: String,  max: 100},
		macTag: {type: String,  max: 100},
		nPropagacion: {type: Number },        
        rssiProm: {type: Number},
		desviacionEstandar: {type: Number},
		sampleId:{type:String}
		

	}
);  

//Export model
module.exports = mongoose.model('ConstantesDistancia', constantesDistanciaSchema);