var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var zonaSchema = new Schema({
    

    idLocation:{ type: Schema.Types.ObjectId, ref: 'Client' },

    edificio: {type: String},
    nombrePiso: {type: String  },      
    numeroPiso: {type: Number },  
    plano:{type:String},      
    
    //regiones
    idPiso:{ type: Schema.Types.ObjectId, ref: 'zona'},
    nombreRegion: {type: String},
    numeroRegion:{type:Number},

    bottomLeft:{type:Number},
    bottomRigth:{type:Number},
    topLeft:{type:Number},
    topRight:{type:Number},

    //piso
    plano:{type:String},
    tipo:{type:String},
    estatus: {type:Boolean},
    alto: {type:Number},
    ancho: {type:Number},


	}
);  

//Export model
module.exports = mongoose.model('zona', zonaSchema);



