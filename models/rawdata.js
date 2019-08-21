var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var rawDataSchema = new Schema(
	{
		macRpi: {type: String,  max: 100},
		macTag: {type: String , max: 100},        
        rssi: {type: Number},
		rpidate: {type: Date, unique:true},
		beacontype:{type:String},
		sampleId:{type:String},
		muestras:{type:Number}
	}
);  

//Export model
module.exports = mongoose.model('RawData', rawDataSchema);