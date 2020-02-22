var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var timerToreciveActive = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        asset:{type: Schema.Types.ObjectId, ref: 'Activo'},
        startRegion:{type: Schema.Types.ObjectId, ref: 'zona'},
        arrivalregion:{type: Schema.Types.ObjectId, ref: 'zona'},
        timeMin:{type: Number},
        time:{type: Array}

    }
);  

//Export model
module.exports = mongoose.model('reportreciveactive', timerToreciveActive);