const mongoose = require('mongoose');


let Schema = mongoose.Schema;

let varsettingSchema = new Schema({
    
    lowBatteryLevel: {
        type: Number
    },
    tagLastSeen: {
        type: Number
    },
    gatewayLastSeen: {
        type: Number
    },
    idClient: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }

    
    
});

module.exports = mongoose.model('Alarmsettings', varsettingSchema);
