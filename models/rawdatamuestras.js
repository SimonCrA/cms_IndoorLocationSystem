var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var rawDataMuestrasSchema = new Schema(
	{
		macRpi: {type: String,  max: 100},
		macTag: {type: String , max: 100},        
        rssi: {type: Number},
		distance: {type: Number}
		
	},{
		timestamps: true
	}
);  

//Export model
module.exports = mongoose.model('RawDataMuestras', rawDataMuestrasSchema);