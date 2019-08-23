var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var constantesDistanciaSchema = new Schema({

<<<<<<< HEAD
		macRpi: {type: String,  max: 100},
		macTag: {type: String,  max: 100},
=======
		macrpi: {type: String, max: 50},
		mactag: {type: String,  max: 50},
>>>>>>> 2539727928105f483957d9ca1a04ce90fe60f9a3
		nPropagacion: {type: Number },        
        rssiProm: {type: Number},
		desviacionEstandar: {type: Number}
		

	}
);  

//Export model
module.exports = mongoose.model('ConstantesDistancia', constantesDistanciaSchema);