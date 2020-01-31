var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var graficarSchema = new Schema(
	{
		date: {type: Date },
		x: {type: Number },        
        y: {type: Number},
		region: { type: Schema.Types.ObjectId, ref: 'zona', required: false },
		idTag:{type: String}
	}
);  

//Export model
module.exports = mongoose.model('Graficar', graficarSchema);