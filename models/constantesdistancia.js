var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var constantesDistanciaSchema = new Schema({

		macrpi: {type: String, max: 50},
		mactag: {type: String,  max: 50},
		nPropagacion: {type: Number },        
        rssiProm: {type: Number},
		desviacionEstandar: {type: Number}
		

	}
);  

//Export model
module.exports = mongoose.model('ConstantesDistancia', constantesDistanciaSchema);