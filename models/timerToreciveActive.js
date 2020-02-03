var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var timerToreciveActive = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'user'},

        activo:{type: Schema.Types.ObjectId, ref: 'activo'},
        regionPartida:{type: Schema.Types.ObjectId, ref: 'zona'},
        regionLLegada:{type: Schema.Types.ObjectId, ref: 'zona'},
        duracionString:{type: String},
        duracion:{type: Array}

	}
);  

//Export model
module.exports = mongoose.model('reportreciveactive', timerToreciveActive);